<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException; // Ezt add hozzá!
use PHPUnit\Event\Code\Throwable;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

abstract class Controller
{
    protected function apiResponse(callable $callback)
    {
        try {
            $result = $callback();
            return response()->json([
                'message' => 'OK',
                'data' => $result
            ], 200, options: JSON_UNESCAPED_UNICODE);

        } catch (ValidationException $e) {
            // Validációs hiba (pl. üresen hagyott kötelező mező)
            return response()->json([
                'message' => 'Validációs hiba történt.',
                'errors' => $e->errors(), // Itt küldjük vissza, mi volt a baj pontosan
                'data' => null
            ], 422, options: JSON_UNESCAPED_UNICODE);

        } catch (\Throwable $e) {
            $status = 500;
            if ($e instanceof HttpExceptionInterface) $status = $e->getStatusCode();
            if ($e instanceof ModelNotFoundException) $status = 404;

            return response()->json([
                'message' => config('app.debug') ? 
                    $e->getMessage() : 'Váratlan hiba történt.',
                'data' => null
            ], $status, options: JSON_UNESCAPED_UNICODE);
        }
    }
}
