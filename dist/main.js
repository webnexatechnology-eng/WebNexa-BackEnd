"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log("ADMIN_EMAIL AT BOOT =", process.env.ADMIN_EMAIL);
    console.log("ADMIN_PASSWORD AT BOOT =", process.env.ADMIN_PASSWORD);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
        ],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map