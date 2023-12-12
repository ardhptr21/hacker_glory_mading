<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class DashboardUserController extends Controller
{
  public function index(UserRepository $userRepository)
  {
    $users = $userRepository->getAll();

    return inertia('dashboard/user/index', compact('users'));
  }

  public function destroy(User $user)
  {
    $deleted = $user->delete();

    if ($deleted) {
      return redirect()->back()->with('success', 'Gagal menghapus user.');
    }

    return redirect()->back()->with('error', 'Berhasil menghapus user.');
  }
}
