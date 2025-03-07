# Start experiment

Changes to [trial01](http://../trial01/README-md):
- The outermost projection in subqueries has now the latest position.
- Changed table generation (generate_tables(5, 2))
        let tables = generate_tables(5, 2);
        let forbidden_names = tables.map(e => e.name);
        let query = generate_query([...tables], forbidden_names, 4);

- No repetitions of tables in table generation

[click here to start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2025_SQL_With_versus_Subqueries/trial02/SQL_trial02_web.html)
