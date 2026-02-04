<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException; 
use Illuminate\Http\JsonResponse;              

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
        // $middleware->alias([
        //     'ability' => \Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Itt kapjuk el a 422-es hibát
        $exceptions->render(function (ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return new JsonResponse([
                    'message' => $e->getMessage(),
                    'errors' => $e->errors(),
                ], 422, [], JSON_UNESCAPED_UNICODE);
            }
        });
    })->create();
