<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class DashboardUserController extends Controller
{
  public function index(UserRepository $userRepository)
  {
    $users = $userRepository->getAll();

    return inertia('dashboard/user/index', compact('users'));
  }
}
