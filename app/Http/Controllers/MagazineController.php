<?php

namespace App\Http\Controllers;

use App\Models\Magazine;
use App\Repositories\AnalyticRepository;

class MagazineController extends Controller
{
  public function view(Magazine $magazine, AnalyticRepository $analyticRepository)
  {
    if (auth()->check()) {
      $analyticRepository->incrementViews($magazine->id);
    }
    $magazine->load('category:id,name,slug', 'author:id,name,username');
    return inertia('mading/view', compact('magazine'));
  }
}
