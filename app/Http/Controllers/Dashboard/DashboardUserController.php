<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
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

  public function view(User $user)
  {
    return inertia('dashboard/user/view', compact('user'));
  }

  public function create()
  {
    return inertia('dashboard/user/create');
  }



  public function store(StoreUserRequest $request)
  {
    $data = $request->validated();

    $user = User::create($data);

    if (!$user) {
      return back()->with('error', 'Gagal menambahkan user.');
    }

    return to_route('dashboard.user.index')->with('success', 'Berhasil menambahkan user.');
  }

  public function update(UpdateUserRequest $request, User $user)
  {
    $data = $request->validated();

    if (empty($data['password'])) {
      unset($data['password']);
    }

    $updated = $user->update($data);

    if (!$updated) {
      return back()->with('error', 'Gagal mengubah user.');
    }

    return to_route('dashboard.user.view', $user->username)->with('success', 'Berhasil mengubah user.');
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
