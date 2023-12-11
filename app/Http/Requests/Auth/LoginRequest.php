<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'login' => 'required|string',
      'password' => 'required|string',
    ];
  }

  public function messages(): array
  {
    return [
      'login.required' => 'Email/Username/NIP/NIS tidak boleh kosong.',
      'password.required' => 'Password tidak boleh kosong.',
    ];
  }
}
