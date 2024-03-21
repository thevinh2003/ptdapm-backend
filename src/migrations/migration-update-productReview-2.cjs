'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.addColumn('ProductReviews', 'FeedbackDate', { type: Sequelize.DATE });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('ProductReviews', 'FeedbackDate');
        },
};