import { Model } from 'mongoose';
import { Lead } from './leads.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { MailService } from '../mail/mail.service';
export declare class LeadsService {
    private leadModel;
    private mailService;
    constructor(leadModel: Model<Lead>, mailService: MailService);
    create(dto: CreateLeadDto): Promise<{
        success: boolean;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    getStats(): Promise<{
        total: number;
        newLeads: number;
        contacted: number;
        converted: number;
        recent: (import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
}
