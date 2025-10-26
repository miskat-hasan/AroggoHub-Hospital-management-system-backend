import { app } from "./app";
import { connectDB } from "./config/db";
import env from "./config/env";

const start = async () => {
    await connectDB()

    app.listen(env.port, () => {
        console.log(`✅ App is running on http://localhost:${env.port}`)
    })

}

start()