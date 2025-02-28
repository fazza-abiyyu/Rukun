import {CashFlow} from '~/server/model/CashFlow';
import {defineEventHandler, getQuery, sendError, createError, setResponseStatus} from 'h3';

export default defineEventHandler(async (event) => {
    try {

        // Ambil data Cashflow
        const cashflow = await CashFlow.getHeadCashflow();

        // Return hasil data
        return {
            code: 200,
            message: 'Data arus kas berhasil dikembalikan!',
            data: {
                cashflow
            }
        };
    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});