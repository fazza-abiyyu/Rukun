import {PrismaClient, Category} from '@prisma/client';
import {CashFlow} from './CashFlow';

const prisma = new PrismaClient();

interface FlowCashStats {
    total_cashFlowperMonth: number[];
    categories: string[];
}

export class Stats {
    // Get total users
    static async totalUser() {
        const totalUser = await prisma.user.count();
        return totalUser;
    }

    // Get total citizens
    static async totalCitizen() {
        const totalCitizen = await prisma.citizen.count();
        return totalCitizen;
    }

    // Get total male citizens
    static async totalCitizenMale() {
        const totalMaleCitizen = await prisma.citizen.count({
            where: {
                gender: 'Male',
            },
        });
        return totalMaleCitizen;
    }

    // Get total female citizens
    static async totalCitizenFemale() {
        const totalFemaleCitizen = await prisma.citizen.count({
            where: {
                gender: 'Female',
            },
        });
        return totalFemaleCitizen;
    }
    static getCashFlowDashboard = async (year: number) => {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year + 1, 0, 1);

        const results = await prisma.cashFlow.findMany({
            where: {
                date: {
                    gte: startDate,
                    lt: endDate
                }
            },
            select: {
                category: true,
                amount: true,
                date: true
            }
        });

        const CashFlow = {
            Kredit: new Array(12).fill(0),
            Debit: new Array(12).fill(0),
        };

        results.forEach(result => {
            const transactionDate = new Date(result.date);

            // Skip if date is missing or invalid
            if (!transactionDate || isNaN(transactionDate.getTime())) {
                console.error("Invalid or missing date:", result);
                return;
            }

            const yearFull = transactionDate.getFullYear();
            const month = transactionDate.getMonth();

            if (yearFull === year) {
                if (result.category === 'Kredit') {
                    CashFlow.Kredit[month] += result.amount;
                } else if (result.category === 'Debit') {
                    CashFlow.Debit[month] += result.amount;
                }
            }
        });

        const totals = CashFlow.Debit.reduce((a, b) => a + b, 0) - CashFlow.Kredit.reduce((a, b) => a + b, 0);

        return {
            CashFlow: [
                {
                    name: 'Keluar',
                    data: CashFlow.Kredit,
                },
                {
                    name: 'Masuk',
                    data: CashFlow.Debit,
                }
            ],
            totals,
            categories: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
        };
    };

    static async getRatioCashFlow() {
        // Count cash flow by category
        const kreditCount = await prisma.cashFlow.count({
            where: {
                category: 'Kredit',
            },
        });

        const debitCount = await prisma.cashFlow.count({
            where: {
                category: 'Debit',
            },
        });

        const totalCashFlow = kreditCount + debitCount;

        return {
            cashFlow: [debitCount, kreditCount],
            label: ["Masuk", "Keluar"],
            totals: totalCashFlow
        };
    }


}
