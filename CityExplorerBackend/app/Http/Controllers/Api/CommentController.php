<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{
    
    public function index()
    {
        $comments = Comment::all();
        if($comments->count() > 0)
        {
            return response()->json([
                'status' => 200,
                'comments' => $comments
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
        $comment = Comment::find($id);
        if($comment)
        {
            return response()->json([
                'status' => 200,
                'comment' => $comment
            ], 200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No comment found"
            ], 404);
        }
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(), [
                'id_location' => 'required|Integer|max:19',
                'user' => 'required|string|max:191',
                'comment' => 'required|string|max:191',
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
            $comment = new Comment();
            $comment->id_location = $request->id_location;
            $comment->user = $request->user;
            $comment->comment = $request->comment;
            $comment->save();
            return response()->json([
                'status' => 200,
                'message' => "Comment added successfully"
            ], 200);
        }
    }

    public function deleteComment($id)
    {
        $comment = Comment::find($id);
        if($comment)
        {
            $comment->delete();
            return response()->json([
                'status' => 200,
                'message' => "Comment deleted successfully"
            ], 200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No comment found"
            ], 404);
        }
    }

    public function updateComment(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(), [
                
                'id_location' => 'required|Integer|max:19',
                'user' => 'required|string|max:191',
                'comment' => 'required|string|max:191',
            ]
        );
        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }else{
            $comment = Comment::find($id);
            if($comment)
            {
                $comment->update([
                    'id_location' => $request->id_location,
                    'user' => $request->user,
                    'comment' => $request->comment,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Comment updated successfully",
                    'comment' => $comment
                ], 200);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => "No comment found"
                ], 404);
            }
        }   
    }
}
