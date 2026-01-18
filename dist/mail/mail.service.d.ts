import { CreateLeadDto } from '../leads/dto/create-lead.dto';
export declare class MailService {
    private transporter;
    constructor();
    sendClientMail(to: string, name: string): Promise<any>;
    sendAdminMail(dto: CreateLeadDto): Promise<any>;
    sendContactedMail(to: string, name: string): Promise<any>;
}
