import reportService from "../../../services/report-service/ReportService";
import PdfIcon from '../../../shared/icons/pdf.svg?react';
import {IconButton} from "@mui/material";

interface Props {
    orderId: string;
    orderNumber?: string
}

const DownloadPdfButton: React.FC<Props> = ({ orderId, orderNumber = "заказ" }) => {
    const handleDownload = async () => {
        try {
            const response = await reportService.exportPdf(orderId);

            // Создание Blob и скачивание
            const blob = new Blob([response], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${orderNumber}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Ошибка при скачивании PDF", error);
        }
    };

    return <IconButton onClick={handleDownload}><PdfIcon/></IconButton>;
};

export default DownloadPdfButton;
