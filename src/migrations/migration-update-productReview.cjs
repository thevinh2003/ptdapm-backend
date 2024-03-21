'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.addColumn('ProductReviews', 'Feedback', { type: Sequelize.TEXT });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('ProductReviews', 'Feedback');
        },
};