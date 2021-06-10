import React, { FC, useEffect } from "react";

import { useCatalogFilters } from "./hooks/useCatalogFilters";
import { useCatalogProducts } from "./hooks/useCatalogProducts/useCatalogProducs";

const CatalogView: FC = () => {
  const { filters, handlers } = useCatalogFilters();
  const { catalogState } = useCatalogProducts({ filters });

  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);

  useEffect(() => {
    console.log("catalogState", catalogState);
  }, [catalogState]);

  return (
    <div>
      {
        // <TableContainer component={Paper}>
        //   <Table className={classes.table} aria-label="simple table">
        //     <TableHead>
        //       <TableRow>
        //         <TableCell>Dessert (100g serving)</TableCell>
        //         <TableCell align="right">Calories</TableCell>
        //         <TableCell align="right">Fat&nbsp;(g)</TableCell>
        //         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
        //         <TableCell align="right">Protein&nbsp;(g)</TableCell>
        //       </TableRow>
        //     </TableHead>
        //     <TableBody>
        //       {catalogState.sorted.map((row) => (
        //         <TableRow key={row.name}>
        //           <TableCell component="th" scope="row">
        //             {row.name}
        //           </TableCell>
        //           <TableCell align="right">{row.calories}</TableCell>
        //           <TableCell align="right">{row.fat}</TableCell>
        //           <TableCell align="right">{row.carbs}</TableCell>
        //           <TableCell align="right">{row.protein}</TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        // </TableContainer>
      }
    </div>
  );
};

export { CatalogView };
