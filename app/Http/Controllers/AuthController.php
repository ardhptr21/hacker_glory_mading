<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{

  public function login(LoginRequest $request)
  {
    $credentials = $request->validated();

    $user = User::where('email', $credentials['login'])
      ->orWhere('username', $credentials['login'])
      ->orWhere('nis', $credentials['login'])
      ->first();

    if ($user && password_verify($credentials['password'], $user->password)) {
      auth()->login($user);
      $request->session()->regenerate();
      return redirect()->intended('/');
    }

    return back()->with('error', 'Login gagal, pastikan credential yang anda masukkan benar.');
  }

  public function register(RegisterRequest $request)
  {
    $data = $request->validated();

    $user = User::create($data);

    if ($user) return redirect()->route('auth.login')->with('success', 'Akun berhasil dibuat, silahkan login.');

    return back()->with('error', 'Akun gagal dibuat, silahkan coba lagi.');
  }
}
