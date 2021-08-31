const cucumber: any = require('cypress-cucumber-preprocessor').default

const webpack: any = require('@cypress/webpack-preprocessor')

// cypress/plugins/index.ts

/// <reference types="cypress" />

/**

 * @type {Cypress.PluginConfig}

 */

module.exports = (on: any, config: any) => {

    // `on` is used to hook into various events Cypress emits

    // `config` is the resolved Cypress config

    on('file:preprocessor', cucumber())

    const options = {

        webpackOptions: require('../webpack.config.js')

    }

    on('file:preprocessor', webpack(options))

}