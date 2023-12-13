<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
      'email' => 'required|email|max:255|unique:users,email,' . $this->user->id,
      'username' => 'required|string|max:255|regex:/^[a-zA-Z0-9]+$/|unique:users,username,' . $this->user->id,
      'password' => 'string|min:8|nullable',
      'role' => 'required|in:admin,siswa,guru,pengurus',
      'nis' => 'required_if:role,siswa,pengurus|string|digits:10|nullable|unique:users,nis,' . $this->user->id,
      'nip' => 'required_if:role,guru|string|digits:18|unique:users|nullable',
    ];
  }
}
