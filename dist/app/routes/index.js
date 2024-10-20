"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const meal_routes_1 = require("../modules/meal/meal.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRouter,
    },
    {
        path: '/user',
        route: user_route_1.userRouter,
    },
    {
        path: '/meal',
        route: meal_routes_1.mealRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
