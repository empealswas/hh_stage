import {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import {NavLink as RouterLink, matchPath, useLocation} from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import {alpha, useTheme, styled} from '@material-ui/core/styles';
import {Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton} from '@material-ui/core';
import {Can} from '../utils/Ability';
import {API, graphqlOperation} from "aws-amplify";
import {UserContext} from "../App";
import humanMaleChild from '@iconify/icons-mdi/human-male-child';
import {Parent} from "../models/Parent";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
    ({theme}) => ({
        ...theme.typography.body2,
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(2.5),
        color: theme.palette.text.secondary,
        '&:before': {
            top: 0,
            right: 0,
            width: 3,
            bottom: 0,
            content: "''",
            display: 'none',
            position: 'absolute',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            backgroundColor: theme.palette.primary.main
        }
    })
);

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
    item: PropTypes.object,
    active: PropTypes.func
};

function NavItem({item, active}) {
    const theme = useTheme();
    const isActiveRoot = active(item.path);
    const {title, path, icon, info, children} = item;
    const [open, setOpen] = useState(isActiveRoot);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const activeRootStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium',
        bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:before': {display: 'block'}
    };

    const activeSubStyle = {
        color: 'text.primary',
        fontWeight: 'fontWeightMedium'
    };

    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot && activeRootStyle)
                    }}
                >
                    <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
                    <ListItemText disableTypography primary={title}/>
                    {info && info}
                    <Box
                        component={Icon}
                        icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                        sx={{width: 16, height: 16, ml: 1}}
                    />
                </ListItemStyle>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((item) => {
                            const {title, path} = item;
                            const isActiveSub = active(path);

                            return (
                                <ListItemStyle
                                    key={title}
                                    component={RouterLink}
                                    to={path}
                                    sx={{
                                        ...(isActiveSub && activeSubStyle)
                                    }}
                                >
                                    <ListItemIconStyle>
                                        <Box
                                            component="span"
                                            sx={{
                                                width: 4,
                                                height: 4,
                                                display: 'flex',
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'text.disabled',
                                                transition: (theme) => theme.transitions.create('transform'),
                                                ...(isActiveSub && {
                                                    transform: 'scale(2)',
                                                    bgcolor: 'primary.main'
                                                })
                                            }}
                                        />
                                    </ListItemIconStyle>
                                    <ListItemText disableTypography primary={title}/>
                                </ListItemStyle>
                            );
                        })}
                    </List>
                </Collapse>
            </>
        );
    }

    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot && activeRootStyle)
            }}
        >
            <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
            <ListItemText disableTypography primary={title}/>
            {info && info}
        </ListItemStyle>
    );
}

NavSection.propTypes = {
    navConfig: PropTypes.array
};


const query = `query MyQuery($id: ID = "") {
  getParent(id: $id) {
    children {
      items {
        Pupil {
          firstName
          id
          lastName
          parents {
            items {
              Parent {
                firstName
                id
                lastName
              }
            }
          }
          school {
            name
          }
          schoolHouse {
            name
          }
          classrooms {
            items {
              classroom {
                name
                yearGroup {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
`
export default function NavSection({navConfig, ...other}) {
    const {pathname} = useLocation();
    const user = useContext(UserContext);
    const [additionalLinks, setAdditionalLinks] = useState(null);
    console.log(pathname)
    const match = (path) => (path ? !!matchPath({path, end: false}, pathname) : false);
    useEffect(() => {
        const getPupils = async () => {
            const result = await API.graphql(graphqlOperation(query, {id: user.email}));
            const links = result.data.getParent.children.items.map(item => item.Pupil).map(pupil => {
                return {
                    title: `${pupil.firstName} ${pupil.lastName}`,
                    path: `pupils/${pupil.id}`,
                    icon: <Icon icon={humanMaleChild} width={22} height={22}/>
                }
            });
            setAdditionalLinks(links);
        }
        if(user instanceof Parent){
            getPupils();
        }
        return () => {

        };
    }, []);

    return (
        <Box {...other}>
            <List disablePadding>
                {navConfig.map((item) => (
                    <Can I={'visit'} a={item.title}>
                        <NavItem key={item.title} item={item} active={match}/>
                    </Can>
                ))}
                {additionalLinks &&
                additionalLinks.map(item => (
                    <NavItem key={item.title} item={item} active={match}/>
                ))
                }

            </List>
        </Box>
    );
}
