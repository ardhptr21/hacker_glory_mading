<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => 'required|string|max:255',
      'email' => 'required|email|max:255|unique:users',
      'username' => 'required|string|max:255|unique:users|regex:/^[a-zA-Z0-9]+$/',
      'nis' => 'required|string|digits:10|unique:users',
      'password' => 'required|string|min:8',
    ];
  }

  public function messages(): array
  {
    return [
      'name.required' => 'Nama tidak boleh kosong.',
      'name.max' => 'Nama tidak boleh lebih dari 255 karakter.',
      'email.required' => 'Email tidak boleh kosong.',
      'email.email' => 'Email tidak valid.',
      'email.max' => 'Email tidak boleh lebih dari 255 karakter.',
      'email.unique' => 'Email sudah terdaftar.',
      'username.required' => 'Username tidak boleh kosong.',
      'username.max' => 'Username tidak boleh lebih dari 255 karakter.',
      'username.unique' => 'Username sudah terdaftar.',
      'username.regex' => 'Username hanya boleh berisi huruf dan angka.',
      'nis.required' => 'NIS tidak boleh kosong.',
      'nis.digits' => 'NIS harus berisi 10 digit angka.',
      'nis.unique' => 'NIS sudah terdaftar.',
      'password.required' => 'Password tidak boleh kosong.',
      'password.min' => 'Password minimal 8 karakter.',
    ];
  }
}
