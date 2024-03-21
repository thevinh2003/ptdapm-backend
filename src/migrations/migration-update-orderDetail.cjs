'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.addColumn('OrderDetails', 'size', { type: Sequelize.STRING });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('OrderDetails', 'size');
        },
};