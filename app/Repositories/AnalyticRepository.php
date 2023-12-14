<?php

namespace App\Repositories;

use App\Models\Analytic;

class AnalyticRepository
{
  public function incrementViews($magazineId)
  {

    $analytic = Analytic::whereDay('created_at', now()
      ->today())
      ->where('magazine_id', $magazineId)->first();

    if (!$analytic) {
      return Analytic::create(['magazine_id' => $magazineId, 'views' => 1]);
    }

    return $analytic->increment('views');
  }
}
