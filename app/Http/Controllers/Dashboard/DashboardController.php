<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;

class DashboardController extends Controller
{
  public function index()
  {

    $magazines = auth()
      ->user()
      ->magazines()
      ->select(['id', 'approved'])
      ->withSum('analytics', 'views')
      ->get()
      ->groupBy('approved');
    $merged = collect()->merge($magazines->get(1))->merge($magazines->get(0));
    $analytics = collect([
      'total_views' => $merged->sum('analytics_sum_views'),
      'total_magazines' => $merged->count(),
      'total_pending_magazines' => $magazines->get(0)?->count() ?? 0,
    ]);

    if (auth()->user()->role === 'admin') {
      $analytics->put('total_users', User::count());
    }

    // dd($analytics);


    return inertia('dashboard/index', compact('analytics'));
  }
}
