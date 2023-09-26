<?php

namespace App\Http\Controllers;

//use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use DB;
//use Validator;

class AuthController extends Controller
{

    private $apiToken;
    public function __construct()
        {
        $this->apiToken = uniqid(base64_encode(Str::random(40)));
        }
    /** 
     * 
     * @return \Illuminate\Http\Response*/

    public function register(Request $request){
        
        $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        // Create a personal access token for the user so they can start using the API right away
        $token = $user->createToken('appToken')->plainTextToken;
    
        return response()->json(['token' => $token], 200);
    }

    public function login(Request $request){ 
        //User check
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
        //Setting login response 
        $success['token'] = $this->apiToken;
        $success['fname'] =  $user->fname;
        $success['lname'] =  $user->lname;
        $success['email'] =  $user->email;
        $success['email_verified_at'] =  $user->email_verified_at;
        $success['id'] =  $user->id;
            return response()->json([
            'status' => 'success',
            'data' => $success
            ]); 
        } else { 
            return response()->json([
            'status' => 'error',
            'data' => 'Unauthorized Access'
            ]); 
        } 
    }
    public function updateUser(Request $request){
        $id = $request->id;
        $user = DB::table('Users')->where('id', $id)->first();
        if($user){
            //$request->id->fill($request->post())->update();
            $affected = DB::table('Users')
              ->where('id', $user->id)
              ->update([
                'fname' => $request->fname,
                'lname' => $request->lname,
                'email' => $request->email,
                ]);
                $success['id'] =  $request->id;
                $success['fname'] =  $request->fname;
                $success['lname'] =  $request->lname;
                $success['email'] =  $request->email;
                return response()->json([
                    'data' => $success,
                    'message'=>'User Details Updated Successfully!!'
                ]);
        }else{
            return response()->json([
                'message'=>'Something goes wrong while updating User Details!!'
            ],500);
        }
        
        /*try{
        $request->id->fill($request->post())->update();
        return response()->json([
            'message'=>'User Details Updated Successfully!!'
        ]);
        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating User Details!!'
            ],500);
        }*/
        
    }
    
    
}
