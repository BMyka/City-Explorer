<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Location;
use Illuminate\Support\Facades\Validator;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();
        if($locations->count() > 0)
        {
            return response()->json([
                'status' => 200,
                'locations' => $locations
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
        $location = Location::find($id);
        $location = Location::find($id);
        if($location)
        {
            return response()->json([
                'status' => 200,
                'location' => $location
            ], 200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No location found"
            ], 404);
        }
    }

    public function store(Request  $request)
    {
        $validator = Validator::make(
            $request->all(), [
                'id_city' => 'required|Integer|max:19',
                'name' => 'required|string|max:191',
                'description' => 'required|string|max:191',
                'image' => 'required|string|max:191',
                'coordinates' => 'required|string|max:191',
            ]
        );
        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }
        else{
            $location = new Location();
            $location->id_city = $request->id_city;
            $location->name = $request->name;
            $location->description = $request->description;
            $location->image = $request->image;
            $location->coordinates = $request->coordinates;
            $location->save();
            return response()->json([
                'status' => 200,
                'message' => "Location created successfully"
            ], 200);
        }
    }

    public function deleteLocation($id)
    {
        $location = Location::find($id);
        if($location)
        {
            $location->delete();
            return response()->json([
                'status' => 200,
                'message' => "Location deleted successfully"
            ], 200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No location found"
            ], 404);
        }
    }

   
    public function updateLocation(Request $request, $id)
    {
        $location = Location::find($id);
        if($location)
        {
            $validator = Validator::make(
                $request->all(), [
                    'id_city' => 'required|Integer|max:19',
                    'name' => 'required|string|max:191',
                    'description' => 'required|string|max:191',
                    'image' => 'required|string|max:191',
                    'coordinates' => 'required|string|max:191',
                ]
            );
            if($validator->fails())
            {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages()
                ], 422);
            }
            else{
                $location->id_city = $request->id_city;
                $location->name = $request->name;
                $location->description = $request->description;
                $location->image = $request->image;
                $location->coordinates = $request->coordinates;
                $location->save();
                return response()->json([
                    'status' => 200,
                    'message' => "Location updated successfully"
                ], 200);
            }
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No location found"
            ], 404);
        }
    }


}
