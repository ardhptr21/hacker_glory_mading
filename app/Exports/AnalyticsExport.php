<?php

namespace App\Exports;

use App\Models\Analytic;
use App\Models\Magazine;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class AnalyticsExport implements WithMultipleSheets
{
  protected string $range = '7d';

  public function __construct(?string $range)
  {
    if ($range) {
      $this->range = $range;
    }
  }

  public function sheets(): array
  {
    $data = Analytic::whereIn('magazine_id', Magazine::where('author_id', auth()->id())->pluck('id'))
      ->byRange($this->range)
      ->get();

    $sheets = [
      new AnalyticsGeneralSheet($data->sum('views')),
      new AnalyticsDataSheet($data, $this->range),
    ];

    return $sheets;
  }
}
