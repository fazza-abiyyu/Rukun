import {prisma} from '~/server/config/db';

export class Stats {
    static getUserQuizResults = (userId: number) => {
        return prisma.userQuizResult.findMany({
            where: {user_id: userId},
            orderBy: {completed_at: 'desc'},
        });
    };

    static getTotalScore = async (userId: number) => {
        const quizResults = await this.getUserQuizResults(userId);
        return quizResults.reduce((total, result) => total + result.score, 0);
    };

    static getLastTestStatus = async (userId: number) => {
        const quizResults = await this.getUserQuizResults(userId);
        return quizResults.length > 0 ? quizResults[0].category : 'No test taken';
    };

    static getRatioAllResult = async (userId: number) => {
        const quizResults = await this.getUserQuizResults(userId);
        if (quizResults.length === 0) {
            return {
                "Sedang": 0,
                "Buruk": 0,
                "Baik": 1
            }
        }
        const categoryCounts: { [key: string]: number } = {};

        quizResults.forEach(result => {
            if (result.category in categoryCounts) {
                categoryCounts[result.category]++;
            } else {
                categoryCounts[result.category] = 1;
            }
        });

        return categoryCounts;
    };

    static getMonthlyAverageScores = async (user_id: number, year: number) => {
        const scores = new Array(12).fill(0);
        const counts = new Array(12).fill(0);

        const results = await prisma.userQuizResult.findMany({
            where: {
                AND: [
                    {user_id},
                    {
                        completed_at: {
                            gte: new Date(year, 0, 1),
                            lt: new Date(year + 1, 0, 1),
                        }
                    }
                ]
            }
        });

        results.forEach(result => {
            const month = new Date(result.completed_at).getMonth();
            scores[month] += result.score;
            counts[month]++;
        });

        const averageScores = scores.map((score, index) => counts[index] ? score / counts[index] : 0);

        return {
            averageScores,
            categories: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
        };
    };
}
