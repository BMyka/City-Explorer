<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\UserController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 

//get all cities
Route::get('cities', [CityController::class, 'index']);
//get city by id
Route::get('city/{id}', [CityController::class, 'show']);
//add city
Route::post('cities', [CityController::class, 'store']);
//remove city
Route::delete('city/{id}', [CityController::class, 'deleteCity']);
//update city
Route::put('city/{id}', [CityController::class, 'updateCity']);

//get all locations
Route::get('locations', [LocationController::class, 'index']);
//get location by id
Route::get('location/{id}', [LocationController::class, 'show']);
//add location
Route::post('locations', [LocationController::class, 'store']);
//remove location
Route::delete('location/{id}', [LocationController::class, 'deleteLocation']);
//update location
Route::put('location/{id}', [LocationController::class, 'updateLocation']);
//get locations by city id
Route::get('locations/{id}', [LocationController::class, 'getLocationsByCityId']);

//get all comments
Route::get('comments', [CommentController::class, 'index']);
//get comment by id
Route::get('comment/{id}', [CommentController::class, 'show']);
//add comment
Route::post('comments', [CommentController::class, 'store']);
//remove comment
Route::delete('comment/{id}', [CommentController::class, 'deleteComment']);
//update comment
Route::put('comment/{id}', [CommentController::class, 'updateComment']);
//get comments by location id
Route::get('comments/{id}', [CommentController::class, 'getCommentsByLocationId']);


//get all users
Route::get('users', [UserController::class, 'index']);
//get user by id
Route::get('user/{id}', [UserController::class, 'show']);
//add user
Route::post('users', [UserController::class, 'store']);
//remove user
Route::delete('user/{id}', [UserController::class, 'delete']);
//update user
Route::put('user/{id}', [UserController::class, 'update']);
