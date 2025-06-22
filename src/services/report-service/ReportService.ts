import {reportApi} from "../../clients/generated";


class ReportService {

    async exportPdfSpecification(orderId: string) {
        try {
            return await reportApi.generateOrderReport(orderId);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async exportPdf(orderId: string) {
        try {
            return await reportApi.generateOrderPdf(orderId);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const reportService = new ReportService();

export default reportService;