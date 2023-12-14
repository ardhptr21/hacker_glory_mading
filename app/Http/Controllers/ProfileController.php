<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profile\ChangePasswordProfileRequest;
use App\Http\Requests\Profile\UpdateProfileRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
  public function index()
  {
    return inertia('profile/index');
  }

  public function update(UpdateProfileRequest $request)
  {
    $updated = $request->user()->update($request->validated());

    if (!$updated) {
      return back()->with('error', 'Profile gagal diperbarui');
    }

    return back()->with('success', 'Profile berhasil diperbarui');
  }

  public function change_password(ChangePasswordProfileRequest $request)
  {
    if (!Hash::check($request->old_password, auth()->user()->password)) {

      throw ValidationException::withMessages([
        'old_password' => 'Password lama tidak sesuai',
      ]);
    }

    $updated = auth()->user()->update([
      'password' => bcrypt($request->password),
    ]);

    if (!$updated) {
      return back()->with('error', 'Password gagal diperbarui');
    }

    return back()->with('success', 'Password berhasil diperbarui');
  }
}
