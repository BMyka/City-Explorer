<?php

namespace App\Http\Controllers\Api;

use App\Models\City;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::all();
        if($cities->count() > 0)
        {
            return response()->json([
                'status' => 200,
                'cities' => $cities
            ], 200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "No records found"
            ], 404);
        }

    }

    public function show($id)
    {
        $city = City::find($id);
        if($city)
        {
            return response()->json([
                'status' => 200,
                'city' => $city
            ], 200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No city found"
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(), [
                'name' => 'required|string|max:191',
                'description' => 'required|string|max:191',
                'logo' => 'required|string|max:191',
            ]
        );
        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }else{
            $city = City::create([
                'name' => $request->name,
                'description' => $request->description,
                'logo' => $request->logo,
            ]);
            

            if($city)
            {
                return response()->json([
                    'status' => 200,
                    'message' => "City created successfully",
                    'city' => $city
                ], 200);
            }
            else{
                return response()->json([
                    'status' => 500,
                    'message' => "Internal server error"
                ], 500);
            }
        }
        
    }
    //remove city
    public function deleteCity($id)
    {
        $city = City::find($id);
        if($city)
        {
            $city->delete();
            return response()->json([
                'status' => 200,
                'message' => "City deleted successfully"
            ], 200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No city found"
            ], 404);
        }
    }
    
    //update city
    public function updateCity(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(), [
                'name' => 'required|string|max:191',
                'description' => 'required|string|max:191',
                'logo' => 'required|string|max:191',
            ]
        );
        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }else{
            $city = City::find($id);
            if($city)
            {
                $city->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'logo' => $request->logo,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "City updated successfully",
                    'city' => $city
                ], 200);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => "No city found"
                ], 404);
            }
        }
        
    }

}
