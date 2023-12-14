<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
      'email' => 'required|email|max:255|unique:users,email,' . auth()->id(),
      'username' => 'required|string|max:255|regex:/^[a-zA-Z0-9]+$/|unique:users,username,' . auth()->id(),
      'nis' => 'required_if:role,siswa|string|digits:10|nullable|unique:users,nis,' . auth()->id(),
    ];
  }
}
