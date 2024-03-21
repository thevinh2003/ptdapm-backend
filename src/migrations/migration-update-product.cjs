'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.addColumn('Products', 'StockPrice', { type: Sequelize.DECIMAL });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Products', 'StockPrice');
        },
};