<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Analytic;
use App\Models\Magazine;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function index(Request $request)
  {
    $range = $request->query('range', '7d');

    $total_magazines = Magazine::where('author_id', auth()->id())->count();
    $total_pending_magazines = Magazine::where('author_id', auth()->id())->where('approved', 0)->count();

    $analytics_data = Analytic::whereIn('magazine_id', Magazine::where('author_id', auth()->id())->pluck('id'))
      ->byRange($range)
      ->get();

    $analytics = collect([
      'total_views' => $analytics_data->sum('views'),
      'total_magazines' => $total_magazines,
      'total_pending_magazines' => $total_pending_magazines,
      'analytics_data' => $analytics_data
    ]);
    if (auth()->user()->role === 'admin') {
      $analytics->put('total_users', User::count());
    }

    return inertia('dashboard/index', compact('analytics'));
  }
}
