import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(body: CreateLeadDto): Promise<{
        success: boolean;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./leads.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./leads.schema").Lead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./leads.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./leads.schema").Lead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, import("./leads.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./leads.schema").Lead & Required<{
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
        recent: (import("mongoose").Document<unknown, {}, import("./leads.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./leads.schema").Lead & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
}
