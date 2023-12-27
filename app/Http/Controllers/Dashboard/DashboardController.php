<?php

namespace App\Http\Controllers\Dashboard;

use App\Exports\AnalyticsExport;
use App\Http\Controllers\Controller;
use App\Models\Analytic;
use App\Models\Magazine;
use App\Models\User;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class DashboardController extends Controller
{
  public function index(Request $request)
  {
    $range = $request->query('range', '7d');

    $total_magazines = Magazine::where('author_id', auth()->id())->count();
    $total_pending_magazines = Magazine::where('author_id', auth()->id())->where('approved', 0)->count();

    $data = Analytic::whereIn('magazine_id', Magazine::where('author_id', auth()->id())->pluck('id'))
      ->byRange($range)
      ->get()
      ->groupBy(function ($item) {
        return $item->created_at->format('Y-m-d');
      });

    $analytics_data = collect([]);
    foreach ($data as $key => $value) {
      $views = $value->sum('views');
      $analytics_data->push([
        'display_date' => $value->first()->created_at->format('d M Y'),
        'views' => $views,
      ]);
    }

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

  public function exports(Request $request)
  {
    $range = $request->query('range', '7d');
    $name = 'analytics-' . now()->format('Y-m-d-H-i-s') . '.xlsx';
    return Excel::download(new AnalyticsExport($range), $name);
  }
}
