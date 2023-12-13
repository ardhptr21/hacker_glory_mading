<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
      'password' => 'required|string|min:8',
      'role' => 'required|in:admin,penulis,siswa',
      'nis' => 'required_if:role,siswa|string|digits:10|unique:users|nullable',
    ];
  }
}
