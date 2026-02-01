<?php

namespace App\Http\Controllers;

use App\Models\Schoolclass  as CurrentModel;
use App\Http\Requests\StoreSchoolclassRequest  as StoreCurrentModelRequest;
use App\Http\Requests\UpdateSchoolclassRequest  as UpdateCurrentModelRequest;
use Symfony\Component\HttpFoundation\Request;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as FacadesRequest;

class SchoolclassController extends Controller
{
    use AuthorizesRequests;

    public function indexAbc()
    {
        return $this->apiResponse(
            function () {
                return DB::table('schoolclasses')
                    ->select('id', 'osztalyNev')
                    ->orderBy('osztalyNev')
                    ->get();
            }
        );
    }

    public function indexSortSearch($column, $direction, $search = null)
    {
        return $this->apiResponse(
            function () use ($column, $direction, $search) {

                $query = CurrentModel::query();

                // 2. Szűrés (ha van keresőszó)
                if (!empty($search) && $search !== 'all') {
                    $query->where(function ($q) use ($search) {
                        $q->where('osztalyNev', 'like', "%{$search}%");
                        // ->orWhere('description', 'like', "%{$search}%");
                    });
                }

                // 3. Sorbarendezés
                $allowedColumns = ['id', 'osztalyNev']; // Biztonsági lista
                $sortColumn = in_array($column, $allowedColumns) ? $column : 'id';
                $sortDirection = strtolower($direction) === 'desc' ? 'desc' : 'asc';
                $rows = $query->orderBy($sortColumn, $sortDirection)->get();

                return $rows;
            }
        );
    }

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
}
