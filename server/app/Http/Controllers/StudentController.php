<?php

namespace App\Http\Controllers;

use App\Models\Student  as CurrentModel;
use App\Http\Requests\StoreStudentRequest  as StoreCurrentModelRequest;
use App\Http\Requests\UpdateStudentRequest as UpdateCurrentModelRequest;
use App\Models\Schoolclass;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class StudentController extends Controller
{
    use AuthorizesRequests;

    public function indexSturdentsBySchoolclassId(
        int $schoolclassId,
        string $column,
        string $direction,
        ?string $search = null
    ) {
        return $this->apiResponse(
            function () use ($schoolclassId, $column, $direction, $search) {

                // 1. Alap query: az adott osztály diákjai a kapcsolódó adatokkal
                $query = CurrentModel::with('schoolclass')
                    ->where('schoolclassId', $schoolclassId);

                // 2. Keresés (LIKE), ha érkezett keresőszó
                if ($search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('diakNev', 'like', "%{$search}%")
                            ->orWhere('lakHelyseg', 'like', "%{$search}%")
                            ->orWhere('lakCim', 'like', "%{$search}%")
                            ->orWhere('szulHelyseg', 'like', "%{$search}%")
                            ->orWhere('igazolvanyszam', 'like', "%{$search}%")
                            // Számok és dátumok "szöveges" keresése
                            ->orWhere('osztondij', 'like', "%{$search}%")
                            ->orWhere('szulDatum', 'like', "%{$search}%")
                            ->orWhere('atlag', 'like', "%{$search}%");
                    });
                }

                // 3. Biztonságos rendezés (Whitelisting)
                // Megadjuk, mely oszlopok szerint engedünk rendezni
                $validColumns = [
                    'id',
                    'diakNev',
                    'neme',
                    'iranyitoszam',
                    'lakHelyseg',
                    'lakCim',
                    'szulHelyseg',
                    'szulDatum',
                    'igazolvanyszam',
                    'atlag',
                    'osztondij',
                    'nemeString',
                    'eletkor',
                ];

                // Ha az URL-ben kapott oszlopnév nincs a listában, válasszuk a diák nevét alapértelmezettnek
                $sortColumn = in_array($column, $validColumns) ? $column : 'id';
                if ($sortColumn == 'nemeString') {
                    $sortColumn = 'neme';
                }
                if ($sortColumn == 'eletkor') {
                    $sortColumn = 'szulDatum';
                }
                // Az irány is legyen biztonságos (csak asc vagy desc)
                $sortDirection = strtolower($direction) === 'desc' ? 'desc' : 'asc';

                return $query->orderBy($sortColumn, $sortDirection)->get();
            }
        );
    }

    public function indexSturdentsWithSchoolclass(
        string $column,
        string $direction,
        ?string $search = null
    ) {
        return $this->apiResponse(
            function () use ($column, $direction, $search) {

                // Érvényes oszlopok ellenőrzése (marad a listád)
                $validColumns = ['id', 'diakNev', 'neme', 'iranyitoszam', 'lakHelyseg', 'lakCim', 'szulHelyseg', 'szulDatum', 'igazolvanyszam', 'atlag', 'osztondij'];
                $sortColumn = in_array($column, $validColumns) ? $column : 'diakNev';
                $sortDirection = strtolower($direction) === 'desc' ? 'desc' : 'asc';

                // 1. Olyan osztályokat kérünk, amiknek van a keresésnek megfelelő diákja
                $query = Schoolclass::whereHas('students', function ($q) use ($search) {
                    if ($search) {
                        $q->where(function ($sub) use ($search) {
                            $sub->where('diakNev', 'like', "%{$search}%")
                                ->orWhere('lakHelyseg', 'like', "%{$search}%")
                                ->orWhere('lakCim', 'like', "%{$search}%")
                                ->orWhere('szulHelyseg', 'like', "%{$search}%")
                                ->orWhere('igazolvanyszam', 'like', "%{$search}%")
                                // Számok és dátumok "szöveges" keresése
                                ->orWhere('osztondij', 'like', "%{$search}%")
                                ->orWhere('szulDatum', 'like', "%{$search}%")
                                ->orWhere('atlag', 'like', "%{$search}%");
                        });
                    }
                })
                    // 2. Betöltjük a diákokat, de CSAK azokat, amik megfelelnek a keresésnek + rendezzük őket
                    ->with(['students' => function ($q) use ($search, $sortColumn, $sortDirection) {
                        if ($search) {
                            $q->where(function ($sub) use ($search) {
                                $sub->where('diakNev', 'like', "%{$search}%")
                                    ->orWhere('lakHelyseg', 'like', "%{$search}%")
                                    ->orWhere('lakCim', 'like', "%{$search}%")
                                    ->orWhere('szulHelyseg', 'like', "%{$search}%")
                                    ->orWhere('igazolvanyszam', 'like', "%{$search}%")
                                    // Számok és dátumok "szöveges" keresése
                                    ->orWhere('osztondij', 'like', "%{$search}%")
                                    ->orWhere('szulDatum', 'like', "%{$search}%")
                                    ->orWhere('atlag', 'like', "%{$search}%");
                            });
                        }
                        if ($sortColumn == 'nemeString') {
                            $sortColumn = 'neme';
                        }
                        if ($sortColumn == 'eletkor') {
                            $sortColumn = 'szulDatum';
                        }
                        $q->orderBy($sortColumn, $sortDirection);
                    }]);

                return $query->get();
            }
        );
    }

    //region crud
    public function index()
    {
        return $this->apiResponse(
            function () {
                return CurrentModel::all();
            }
        );
    }

    public function store(StoreCurrentModelRequest $request)
    {
        return $this->apiResponse(
            function () use ($request) {
                return CurrentModel::create($request->validated());
            }
        );
    }

    public function show(int $id)
    {
        return $this->apiResponse(function () use ($id) {
            return CurrentModel::findOrFail($id);
        });
    }

    public function update(UpdateCurrentModelRequest $request, int $id)
    {
        return $this->apiResponse(function () use ($request, $id) {
            $row = CurrentModel::findOrFail($id);
            $row->update($request->validated());
            return $row;
        });
    }

    public function destroy(int $id)
    {
        return $this->apiResponse(function () use ($id) {
            CurrentModel::findOrFail($id)->delete();
            return ['id' => $id];
        });
    }

    //endregion
}
