<?php

namespace App\Http\Controllers;

use App\Models\Magazine;
use App\Repositories\AnalyticRepository;
use App\Repositories\MagazineRepository;
use Illuminate\Http\Request;

class MagazineController extends Controller
{
  public function index(Request $request, MagazineRepository $magazineRepository)
  {
    $q = $request->query('q');
    $sort = $request->query('sort', 'desc');

    $magazines = $magazineRepository->getAllPublishedAndApproved($q, $sort);

    return inertia('mading/index', compact('magazines'));
  }

  public function view(Magazine $magazine, AnalyticRepository $analyticRepository)
  {
    if (auth()->check()) {
      $analyticRepository->incrementViews($magazine->id);
    }
    $magazine->load('category:id,name,slug', 'author:id,name,username');
    return inertia('mading/view', compact('magazine'));
  }
}
