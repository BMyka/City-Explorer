<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Models\User;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 

//Admin routes
Route::middleware(['auth:api', 'role:' . User::ROLE_ADMIN])->group(function () {
    // All cities
    Route::delete('city/{id}', [CityController::class, 'deleteCity']);
    Route::put('city/{id}', [CityController::class, 'updateCity']);

    // All locations
    Route::delete('location/{id}', [LocationController::class, 'deleteLocation']);
    Route::put('location/{id}', [LocationController::class, 'updateLocation']);

    // All comments
    Route::delete('comment/{id}', [CommentController::class, 'deleteComment']);
    Route::put('comment/{id}', [CommentController::class, 'updateComment']);

    // All users
    Route::get('users', [UserController::class, 'index']);
    // Route::post('users', [UserController::class, 'store']);
    Route::delete('user/{id}', [UserController::class, 'delete']);
    Route::put('user/{id}', [UserController::class, 'update']);
        
});


//Shared routes MEMBER and ADMIN, still requires authentication
Route::middleware('auth:api')->group(function () {
    // User's own profile
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);

    // View cities and locations
    Route::get('cities', [CityController::class, 'index']);
    Route::post('cities', [CityController::class, 'store']);
    Route::get('city/{id}', [CityController::class, 'show']);

    Route::get('locations', [LocationController::class, 'index']);
    Route::post('locations', [LocationController::class, 'store']);
    Route::get('location/{id}', [LocationController::class, 'show']);
    Route::get('locations/{id}', [LocationController::class, 'getLocationsByCityId']);

    // View and add comments
    Route::get('comments', [CommentController::class, 'index']);
    Route::post('comments', [CommentController::class, 'store']);
    Route::get('comment/{id}', [CommentController::class, 'show']);
    Route::get('comments/{id}', [CommentController::class, 'getCommentsByLocationId']);

});

// Guest routes
Route::post('login', [AuthController::class, 'login'])->name('login');

//For testing purposes 
Route::post('users', [UserController::class, 'store']);


