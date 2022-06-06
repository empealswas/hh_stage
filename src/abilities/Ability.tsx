import React, {useContext} from 'react';
import {createContext} from 'react';
import {createContextualCan} from '@casl/react';
import {AnyAbility} from "@casl/ability";
import defineAbilityFor from "./defineAbilityFor";

const ability = defineAbilityFor(null)
export const AbilityContext = createContext<AnyAbility>(ability);
export const Can = createContextualCan(AbilityContext.Consumer);