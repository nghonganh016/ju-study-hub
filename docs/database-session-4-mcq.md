# Advanced Databases, Session 4: Window Function

## Multiple-choice question bank

**Primary source:** `AdvanceDatabases4.pdf` (lecture, 25 PDF pages). **Assessment style reference:** `Quiz 3_Answers.pdf` (20 lecture-aligned MCQs; no questions copied verbatim).

**Instructions:** Choose exactly one answer for each question. Where numeric results depend on row ordering, the stated chronological or numerical ordering is assumed unambiguous. Source page numbers refer to PDF pages, not slide footers.

## LO01: Motivation, use cases, and feature engineering

**Q001. In the lecture’s comparison, why can a running total expressed with a window function be more efficient than a correlated subquery?**

A. It never needs to process the ordered input rows.

B. It can sort the rows and process them in a scan rather than repeatedly re-reading groups.

C. It automatically changes every table into an index.

D. It removes all rows except each group’s final total.

**Correct answer:** B

**Explanation:** The motivation slide contrasts a typical sort-plus-scan approach (about O(N log N)) with repeated work that can approach O(N²). This is an illustrative comparison, not a guarantee for every plan.

**Source:** AdvanceDatabases4.pdf, PDF p. 5.

**Q002. A recommendation system needs the three highest-scoring items in each category. Which lecture problem type best describes this task?**

A. The transaction isolation problem, solved by locking categories.

B. The Top-N problem, solved with ranking within partitions.

C. The moving-average problem, solved by averaging prices.

D. The Gap & Island problem, solved by finding missing dates.

**Correct answer:** B

**Explanation:** Top-N uses a ranking function within each category, with category defining the partition and score defining descending order.

**Source:** AdvanceDatabases4.pdf, PDF p. 6.

**Q003. A stock-price feature should average each observation with the previous six observations. Which technique matches the lecture’s moving-target example?**

A. A LAG() that returns only the immediately following price.

B. A GROUP BY that outputs one total for the entire history.

C. A window aggregate with a seven-row moving frame.

D. A RANK() that assigns consecutive prices their positions.

**Correct answer:** C

**Explanation:** The lecture’s moving-target example applies AVG over the current row and six preceding rows, producing a rolling average of up to seven observations.

**Source:** AdvanceDatabases4.pdf, PDF p. 6.

**Q004. For a churn-prediction dataset, which pair of timestamps is needed to construct the lecture’s days_diff feature for a rental?**

A. The current rental date and the previous rental date of the same customer.

B. The current rental date and the latest date for all customers.

C. The current rental date and the next film release date.

D. The current rental date and the previous rental date of any customer.

**Correct answer:** A

**Explanation:** The customer-behavior case study defines Δt as current rental date minus previous rental date, within each customer’s history.

**Source:** AdvanceDatabases4.pdf, PDF p. 7.

## LO02: Window functions versus GROUP BY

**Q005. A payment table has four payments from customer 7. What is the output shape of `SELECT customer_id, SUM(amount) FROM payment GROUP BY customer_id` for that customer?**

A. Four rows, each showing an accumulated running total.

B. One row representing the total for customer 7.

C. One row for every distinct payment amount.

D. Four rows, each retaining its payment_id.

**Correct answer:** B

**Explanation:** GROUP BY collapses all payments belonging to one customer into a single group result.

**Source:** AdvanceDatabases4.pdf, PDF p. 10.

**Q006. A report must show each `payment_id` beside that customer’s overall spend. Which calculation meets both requirements?**

A. `ROW_NUMBER() OVER (ORDER BY payment_id)` only.

B. `SUM(amount)` with `GROUP BY customer_id` as the only grouping.

C. `SUM(amount) OVER (PARTITION BY customer_id)`.

D. `COUNT(*)` with no OVER clause and no grouping.

**Correct answer:** C

**Explanation:** The OVER clause produces a total per customer while preserving the original payment rows and their IDs.

**Source:** AdvanceDatabases4.pdf, PDF p. 10.

**Q007. Which statement best describes the set of rows considered by a window function?**

A. Only the final row remaining after GROUP BY.

B. Always every row of every table in the database.

C. Only newly inserted rows that have not been committed.

D. Rows related to the current row, used to compute a value for that row.

**Correct answer:** D

**Explanation:** The slide defines a window function as a calculation across table rows related to the current row.

**Source:** AdvanceDatabases4.pdf, PDF p. 9.

**Q008. A manager wants each payment’s amount alongside the customer’s average payment amount. Why is a window aggregate preferable to grouping alone?**

A. It guarantees that every customer has exactly one payment.

B. It updates the stored amount to the customer average.

C. It automatically excludes payments below the customer average.

D. It retains individual payment detail while adding the customer-level metric.

**Correct answer:** D

**Explanation:** A window AVG per customer can be displayed on each payment row; a grouped AVG by customer loses payment-level rows.

**Source:** AdvanceDatabases4.pdf, PDF p. 10.

**Q009. The payment table contains two customers with three and two transactions, respectively. No filters are applied. How many result rows will `SELECT payment_id, SUM(amount) OVER (PARTITION BY customer_id) FROM payment` return?**

A. 2

B. 1

C. 3

D. 5

**Correct answer:** D

**Explanation:** Window calculations preserve the five input payment rows; the partitioning changes the calculated value, not the number of rows.

**Source:** AdvanceDatabases4.pdf, PDF p. 10.

## LO03: OVER, PARTITION BY, and ORDER BY

**Q010. Which clause marks a calculation as a window-function expression in the lecture syntax?**

A. `WHERE ...`

B. `OVER (...)`

C. `GROUP BY ...`

D. `HAVING ...`

**Correct answer:** B

**Explanation:** A function such as SUM becomes a window calculation when it is followed by an OVER clause.

**Source:** AdvanceDatabases4.pdf, PDF p. 11.

**Q011. When a running total is defined with `PARTITION BY customer_id`, what happens on the first payment belonging to a different customer?**

A. The two customers are merged into one output row.

B. The query discards the new customer.

C. The running calculation starts again for the new customer’s partition.

D. The new customer inherits the preceding customer’s running total.

**Correct answer:** C

**Explanation:** PARTITION BY sets the scope: the window calculation resets independently for each customer.

**Source:** AdvanceDatabases4.pdf, PDF p. 11.

**Q012. A ranking calculation has `ORDER BY score DESC` inside `OVER (...)` but no `PARTITION BY`. What scope does the ranking use?**

A. One partition for each column selected in SELECT.

B. The complete set of input rows surviving earlier query stages.

C. Only the first ten input rows, regardless of LIMIT.

D. A separate partition for every score value.

**Correct answer:** B

**Explanation:** When PARTITION BY is omitted, the window operates on the available rows as a single partition.

**Source:** AdvanceDatabases4.pdf, PDF p. 11.

**Q013. A query uses `ROW_NUMBER() OVER (ORDER BY salary DESC)` and ends with `ORDER BY emp_name ASC`. What determines the `ROW_NUMBER()` values?**

A. Alphabetical order if salary has no NULL values.

B. The name ordering because the final sort recomputes row numbers.

C. The physical heap order, regardless of OVER.

D. The salary ordering inside the window, not the name order of displayed rows.

**Correct answer:** D

**Explanation:** The internal window ORDER BY defines numbering; the final ORDER BY only controls presentation.

**Source:** AdvanceDatabases4.pdf, PDF p. 20.

**Q014. In `OVER (PARTITION BY dept ORDER BY salary DESC)`, what role does `ORDER BY salary DESC` play?**

A. It creates one output row for each department.

B. It places the final result rows in salary order without a final ORDER BY.

C. It specifies the sequence within each department.

D. It filters out departments with low salaries.

**Correct answer:** C

**Explanation:** The lecture separates scoping (PARTITION BY) from sequence (ORDER BY inside OVER).

**Source:** AdvanceDatabases4.pdf, PDF p. 11.

**Q015. Match the three components of a window definition to their lecture roles. Which mapping is correct?**

A. PARTITION BY = sequence; ORDER BY = framing; ROWS/RANGE = scoping.

B. PARTITION BY = scoping; ORDER BY = sequence; ROWS/RANGE = framing.

C. PARTITION BY = row deletion; ORDER BY = grouping; ROWS/RANGE = joining.

D. PARTITION BY = framing; ORDER BY = scoping; ROWS/RANGE = sequence.

**Correct answer:** B

**Explanation:** The anatomy slide explicitly identifies these three distinct roles.

**Source:** AdvanceDatabases4.pdf, PDF p. 11.

## LO04: Frames and sliding windows

**Q016. A customer’s chronologically ordered payment amounts are 5, 7, 2, and 9. What is the rolling three-payment SUM at the fourth payment with `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`?**

A. 16

B. 11

C. 18

D. 23

**Correct answer:** C

**Explanation:** At the fourth payment, the frame includes amounts 7, 2, and 9, so the sum is 18.

**Source:** AdvanceDatabases4.pdf, PDF p. 12.

**Q017. For ordered payment amounts 2, 4, 8, what is the rolling three-payment total at the second payment?**

A. 4

B. 14

C. 8

D. 6

**Correct answer:** D

**Explanation:** Only the first and second rows are available at the second payment; their total is 2 + 4 = 6.

**Source:** AdvanceDatabases4.pdf, PDF p. 12.

**Q018. Which frame specification implements the lecture’s moving average over the current observation and the previous six observations?**

A. `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`

B. `ROWS BETWEEN 6 PRECEDING AND 1 PRECEDING`

C. `ROWS BETWEEN CURRENT ROW AND 6 FOLLOWING`

D. `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`

**Correct answer:** A

**Explanation:** Six preceding rows plus the current row yield up to seven observations, matching the example.

**Source:** AdvanceDatabases4.pdf, PDF p. 6.

**Q019. For a payment stream with distinct chronological positions, how does `ROWS BETWEEN 1 PRECEDING AND CURRENT ROW` differ from the lecture’s three-payment frame?**

A. It includes all payments by that customer.

B. It includes the next payment rather than the preceding payment.

C. It averages payments instead of summing them.

D. It includes at most two payment rows rather than three.

**Correct answer:** D

**Explanation:** A ROWS frame ending at CURRENT ROW includes the stated number of preceding rows plus the current row.

**Source:** AdvanceDatabases4.pdf, PDF p. 12.

**Q020. The lab requires a rolling total of payments for each customer. Why must the calculation include both `PARTITION BY customer_id` and chronological `ORDER BY payment_date`?**

A. The partition sorts payments and the ordering joins customers.

B. The partition separates customers while the ordering identifies preceding payments.

C. The ordering alone guarantees customers cannot affect one another.

D. Both clauses remove duplicate payment amounts.

**Correct answer:** B

**Explanation:** Scoping and ordering solve different parts of the sliding-window task.

**Source:** AdvanceDatabases4.pdf, PDF p. 12.

**Q021. Customer A has just one payment of 12, while customer B has many payments. Under a three-payment SUM frame partitioned by customer, what is A’s rolling total?**

A. 0

B. 36

C. 12

D. The sum of the last two payments by customer B.

**Correct answer:** C

**Explanation:** The frame cannot reach rows from another customer; for a one-row partition it includes only that row.

**Source:** AdvanceDatabases4.pdf, PDF p. 12.

## LO05: Ranking functions and ties

**Q022. Films have distinct lengths of 140, 100, and 125 minutes. What ROW_NUMBER is assigned to the 125-minute film under `ORDER BY length DESC`?**

A. 125

B. 1

C. 2

D. 3

**Correct answer:** C

**Explanation:** Descending order is 140, 125, then 100; unique positions are 1, 2, and 3.

**Source:** AdvanceDatabases4.pdf, PDF p. 15.

**Q023. Two films have identical length and the window ORDER BY specifies only length. What can be guaranteed about their ROW_NUMBER values?**

A. They are different, but which film gets the smaller number is not specified.

B. Both receive the rank of the next non-tied row.

C. They must receive the same row number.

D. Both are automatically removed from the result.

**Correct answer:** A

**Explanation:** ROW_NUMBER assigns distinct consecutive integers, but ties need an additional order key for predictable assignment.

**Source:** AdvanceDatabases4.pdf, PDF p. 15.

**Q024. Descending scores are 90, 90, 80, 80, 70. What is the RANK of the score 70?**

A. 5

B. 2

C. 3

D. 4

**Correct answer:** A

**Explanation:** RANK gives the tied 90s rank 1, the tied 80s rank 3, and the 70 rank 5.

**Source:** AdvanceDatabases4.pdf, PDF p. 15.

**Q025. Scores in Department A are 90 and 80; scores in Department B are 100, 100, and 75. Under `DENSE_RANK() OVER (PARTITION BY dept ORDER BY score DESC)`, what is the rank of Department B’s 75?**

A. 2

B. 4

C. 3

D. 1

**Correct answer:** A

**Explanation:** Within Department B, the tied 100s occupy the first distinct-score tier and 75 occupies the second; Department A is a separate partition.

**Source:** AdvanceDatabases4.pdf, PDF p. 15.

**Q026. For an employee leaderboard, which function gives equal ranks for salary ties without leaving gaps in rank numbers?**

A. `COUNT()`

B. `RANK()`

C. `DENSE_RANK()`

D. `ROW_NUMBER()`

**Correct answer:** C

**Explanation:** DENSE_RANK assigns the same number to peers and advances by one for the next distinct value.

**Source:** AdvanceDatabases4.pdf, PDF p. 15.

**Q027. A department must nominate exactly one employee with the largest salary, even if salaries tie. Which ranking approach best matches this row-count requirement?**

A. Use DENSE_RANK and keep ranks at most 2.

B. Use ROW_NUMBER ordered by descending salary, then keep row number 1.

C. Use RANK and keep all rows with rank 1.

D. Use COUNT over the department and keep count 1.

**Correct answer:** B

**Explanation:** ROW_NUMBER gives exactly one row position 1 per nonempty partition; a deterministic tie-breaker can specify which tied person wins.

**Source:** AdvanceDatabases4.pdf, PDF p. 6.

**Q028. Three films in one category have lengths 150, 150, and 140. Filtering on `DENSE_RANK() <= 2` after computing ranks returns how many films?**

A. 1

B. 2

C. 3

D. 0

**Correct answer:** C

**Explanation:** Both 150-minute films have dense rank 1 and the 140-minute film has dense rank 2, so all three qualify.

**Source:** AdvanceDatabases4.pdf, PDF p. 15.

**Q029. How can a ranking query make ROW_NUMBER assignment predictable when multiple films share the same length?**

A. Add a unique tie-breaker such as film_id after length in the window ORDER BY.

B. Remove ORDER BY from OVER.

C. Switch to GROUP BY length before numbering without preserving films.

D. Add a final LIMIT but leave the window ORDER BY unchanged.

**Correct answer:** A

**Explanation:** The slide recommends additional ORDER BY columns to make arbitrary tie ordering stable.

**Source:** AdvanceDatabases4.pdf, PDF p. 15.

## LO06: Aggregate window functions

**Q030. Customer 1 has payments of 4, 6, and 2. What value does each row show for `SUM(amount) OVER (PARTITION BY customer_id)`?**

A. 12

B. 3

C. 4, then 10, then 12

D. 4, then 6, then 2

**Correct answer:** A

**Explanation:** Without an ordering inside OVER, every row receives the customer’s fixed total: 4 + 6 + 2 = 12.

**Source:** AdvanceDatabases4.pdf, PDF p. 16.

**Q031. With distinct chronological payment timestamps, customer 2 pays 8, then 3, then 4. What running total appears on the second payment?**

A. 3

B. 8

C. 11

D. 15

**Correct answer:** C

**Explanation:** The cumulative metric includes the first payment and the second payment, so 8 + 3 = 11.

**Source:** AdvanceDatabases4.pdf, PDF p. 16.

**Q032. A report needs the number of payments made by each customer, displayed on every payment row. Which expression fits?**

A. `COUNT(*) OVER (PARTITION BY customer_id)`

B. `ROW_NUMBER() OVER (ORDER BY amount)`

C. `LAG(amount, 1) OVER (PARTITION BY customer_id)`

D. `COUNT(*) GROUP BY customer_id` inserted directly into the SELECT list.

**Correct answer:** A

**Explanation:** COUNT is listed among window aggregates; OVER(PARTITION BY ...) retains every payment while showing group size.

**Source:** AdvanceDatabases4.pdf, PDF p. 14.

**Q033. Which expression would allow a report to compare each individual payment with the same customer’s mean payment?**

A. `AVG(amount) OVER (PARTITION BY payment_id)`

B. `SUM(amount) GROUP BY customer_id` without preserving individual rows.

C. `RANK() OVER (ORDER BY amount)`

D. `AVG(amount) OVER (PARTITION BY customer_id)`

**Correct answer:** D

**Explanation:** A customer partition gives the same average across that customer’s rows, so an individual amount can be compared with the mean.

**Source:** AdvanceDatabases4.pdf, PDF p. 10.

**Q034. Which pair consists entirely of standard aggregate functions explicitly listed as usable window functions in the lecture?**

A. `LAG()` and `LEAD()`

B. `ROW_NUMBER()` and `FIRST_VALUE()`

C. `RANK()` and `COUNT()`

D. `MIN()` and `MAX()`

**Correct answer:** D

**Explanation:** The aggregate window-function category lists SUM, AVG, COUNT, MIN, and MAX; the other options mix categories.

**Source:** AdvanceDatabases4.pdf, PDF p. 14.

**Q035. Customer A pays 2 and 3, and customer B pays 10 and 4. With a running SUM partitioned by customer and ordered chronologically, what appears on B’s first payment?**

A. 19

B. 5

C. 15

D. 10

**Correct answer:** D

**Explanation:** A new customer partition starts a new cumulative total, so B’s first row reflects only B’s payment of 10.

**Source:** AdvanceDatabases4.pdf, PDF p. 16.

## LO07: Value/offset functions and time series

**Q036. For a customer’s payments ordered 10, 20, 30, 40, what is `LAG(amount, 2)` at the fourth payment?**

A. 30

B. 20

C. 10

D. 40

**Correct answer:** B

**Explanation:** LAG(amount, 2) reads two positions backwards: from row four to row two, whose amount is 20.

**Source:** AdvanceDatabases4.pdf, PDF p. 17.

**Q037. A retention analyst wants the date of each customer’s next rental for every current rental. Which function direction is appropriate?**

A. `RANK()` with no ordering.

B. `SUM(rental_date)` without a window.

C. `LAG(rental_date, 1)` within a customer-ordered window.

D. `LEAD(rental_date, 1)` within a customer-ordered window.

**Correct answer:** D

**Explanation:** LEAD accesses a later row in the specified sequence; partitioning by customer keeps histories separate.

**Source:** AdvanceDatabases4.pdf, PDF p. 17.

**Q038. Consecutive payments by one customer are 10 and 15. What is `amount - LAG(amount, 1)` at the second payment?**

A. 15

B. -5

C. 25

D. 5

**Correct answer:** D

**Explanation:** At the second row, LAG retrieves the earlier amount of 10, so the difference is 15 - 10 = 5.

**Source:** AdvanceDatabases4.pdf, PDF p. 17.

**Q039. A customer rents on 2 March and again on 7 March of the same year, with no rental between. What days_diff does the case study define for the second rental?**

A. 7 days

B. 9 days

C. 2 days

D. 5 days

**Correct answer:** D

**Explanation:** The case-study feature is current date minus previous date for the same customer: 7 - 2 = 5 days.

**Source:** AdvanceDatabases4.pdf, PDF p. 7.

**Q040. A report needs the amount of the earliest payment in each customer’s chronological history. Which listed value function is most appropriate?**

A. `COUNT(amount)` over the same window.

B. `FIRST_VALUE(amount)` over a window ordered by payment_date.

C. `RANK()` ordered by amount only.

D. `LEAD(amount, 1)` over the same window.

**Correct answer:** B

**Explanation:** FIRST_VALUE returns the first value in the defined ordered window; the sort key specifies earliest payment.

**Source:** AdvanceDatabases4.pdf, PDF p. 17.

**Q041. Which value function in the lecture is associated with retrieving the last value of a defined window frame?**

A. `AVG()`

B. `ROW_NUMBER()`

C. `LAST_VALUE()`

D. `RANK()`

**Correct answer:** C

**Explanation:** The value-function slide names FIRST_VALUE and LAST_VALUE. The result is determined by the applicable window frame, so a frame should be specified when a particular last row is required.

**Source:** AdvanceDatabases4.pdf, PDF p. 17.

**Q042. A product team wants to distinguish continuous daily activity from gaps between user sessions. Which lecture technique is most relevant?**

A. Use an index to make the missing timestamps appear.

B. Use GROUP BY to remove every period with inactivity.

C. Use LAG or LEAD to compare neighboring activity observations.

D. Use SUM without an ORDER BY to change every session timestamp.

**Correct answer:** C

**Explanation:** The Gap & Island example uses neighboring-row values to detect state changes and gaps.

**Source:** AdvanceDatabases4.pdf, PDF p. 6.

## LO08: Logical execution order and CTE filtering

**Q043. A query filters employees with `WHERE salary > 1000` and then applies `RANK() OVER (ORDER BY salary DESC)`. Who receives ranks?**

A. Only employees whose rows survived the salary filter.

B. Only employees added after the final ORDER BY.

C. All employees, including those excluded by WHERE.

D. Only employees whose rank is 1.

**Correct answer:** A

**Explanation:** WHERE executes before window functions, so filtered-out employees are invisible to the ranking calculation.

**Source:** AdvanceDatabases4.pdf, PDF p. 20.

**Q044. Which stage immediately precedes WINDOW FUNCTIONS in the simplified execution pipeline on the lecture slide?**

A. `DISTINCT`

B. `HAVING`

C. `LIMIT / OFFSET`

D. `ORDER BY`

**Correct answer:** B

**Explanation:** The shown sequence is FROM/JOIN, WHERE, GROUP BY, HAVING, WINDOW FUNCTIONS, SELECT, DISTINCT, ORDER BY, LIMIT/OFFSET.

**Source:** AdvanceDatabases4.pdf, PDF p. 19.

**Q045. Why is `SELECT * FROM employees WHERE ROW_NUMBER() OVER (ORDER BY salary) = 1` invalid?**

A. Window functions cannot order by numeric columns.

B. ROW_NUMBER requires GROUP BY in every query.

C. WHERE must always be placed after ORDER BY.

D. The window result is not available at the time WHERE is evaluated.

**Correct answer:** D

**Explanation:** The lecture explains that filtering by a window result requires an outer query block.

**Source:** AdvanceDatabases4.pdf, PDF p. 18.

**Q046. A CTE computes `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn`. Where should the predicate `rn = 1` be applied?**

A. In an outer SELECT that reads the CTE.

B. Inside the CTE’s WHERE clause before the window value is computed.

C. In a HAVING clause of the same SELECT without aggregation.

D. In the window’s ORDER BY expression as a Boolean predicate.

**Correct answer:** A

**Explanation:** A CTE or subquery allows the window result to exist before the outer WHERE filters it.

**Source:** AdvanceDatabases4.pdf, PDF p. 18.

**Q047. A query uses a window calculation and then `LIMIT 5`. Which statement follows from the lecture’s logical pipeline?**

A. The window function is automatically re-run on the five remaining rows.

B. The window values are computed before the final LIMIT reduces the displayed rows.

C. The limit changes PARTITION BY into GROUP BY.

D. LIMIT is applied first, so the window sees only five source rows.

**Correct answer:** B

**Explanation:** The lecture positions window functions before final ORDER BY and LIMIT/OFFSET, so LIMIT does not restrict the window input in that same query block.

**Source:** AdvanceDatabases4.pdf, PDF p. 19.

## LO09: Integrated applications: four labs

**Q048. In Film Ranking Lab 1, which three tables must be joined to assign each film to a category and rank its length?**

A. `film`, `film_category`, and `category`.

B. `rental`, `address`, and `country`.

C. `staff`, `payment`, and `city`.

D. `film`, `payment`, and `customer`.

**Correct answer:** A

**Explanation:** Lab 1 explicitly requires joining film to category through film_category before ranking within each category.

**Source:** AdvanceDatabases4.pdf, PDF p. 22.

**Q049. After a join has produced the columns `category_name` and `length`, which expression ranks longer films first within each category as Lab 1 requests?**

A. `DENSE_RANK() OVER (PARTITION BY category_name ORDER BY length DESC)`

B. `DENSE_RANK() OVER (ORDER BY category_name, length ASC)`

C. `ROW_NUMBER() OVER (PARTITION BY length ORDER BY category_name)`

D. `SUM(length) OVER (PARTITION BY category_name)`

**Correct answer:** A

**Explanation:** The lab specifically uses DENSE_RANK, category-based partitions, and descending film length; category_name denotes the available category-name column or alias.

**Source:** AdvanceDatabases4.pdf, PDF p. 22.

**Q050. Why is an outer query with `length_rank <= 3` more appropriate than a global `LIMIT 3` for Lab 1?**

A. It removes films with tied lengths before calculating ranks.

B. It changes the category join into an aggregation.

C. It selects the qualifying ranked films within every category, rather than three rows total.

D. It makes DENSE_RANK return a new value on each row.

**Correct answer:** C

**Explanation:** A Top-N-per-group condition is applied to a rank already calculated for each category; global LIMIT is not equivalent.

**Source:** AdvanceDatabases4.pdf, PDF p. 22.

**Q051. What is the correct sequence of main operations for the lecture’s Month-over-Month (MoM) Growth Lab?**

A. Rank individual payments, remove all but rank 1, then average film lengths.

B. Aggregate revenue by month using DATE_TRUNC, retrieve previous monthly revenue with LAG, then compute growth percent.

C. Use LEAD to obtain the next film length, then sum by film category.

D. Compute growth on each ungrouped payment before identifying its month.

**Correct answer:** B

**Explanation:** Lab 2 first forms monthly revenue totals in a CTE, then uses LAG on that monthly series and applies the stated formula.

**Source:** AdvanceDatabases4.pdf, PDF p. 23.

**Q052. Monthly revenue increases from 100 to 125. According to the Lab 2 formula, what is the MoM growth rate?**

A. 5%

B. 25%

C. 125%

D. 20%

**Correct answer:** B

**Explanation:** MoM growth = (Current - Previous) / Previous × 100 = (125 - 100) / 100 × 100 = 25%.

**Source:** AdvanceDatabases4.pdf, PDF p. 23.

**Q053. An analyst calculates MoM growth as `(Current - Previous) / Current × 100` rather than using the lecture’s formula. What is the mistake?**

A. The denominator should be the previous month’s revenue, not the current month’s revenue.

B. The numerator should always be the sum of both months’ revenue.

C. The expression should compare current revenue with the next month.

D. The result should be multiplied by 10 instead of 100.

**Correct answer:** A

**Explanation:** The lecture defines MoM growth as (Current - Previous) / Previous × 100; the preceding month is the percentage-change baseline.

**Source:** AdvanceDatabases4.pdf, PDF p. 23.

**Q054. For Lab 4, a per-country Top 1 highest-spending customer report must derive country and spend. Which plan is consistent with the learning task?**

A. Choose the single highest-spending customer worldwide with a global LIMIT 1.

B. Apply RANK directly inside WHERE before aggregating spending.

C. Rank individual country names before associating any payments.

D. Join customers to their location and payment data, aggregate spend per customer and country, rank within country, then filter rank 1 outside.

**Correct answer:** D

**Explanation:** The lab requires aggregation by customer and country, then a country-partitioned RANK in a CTE. In the DVD Rental schema, payment data is also needed to derive actual spending.

**Source:** AdvanceDatabases4.pdf, PDF p. 25.

## LO10: Scope and limitations

**Q055. A checkout service needs to protect a stock-update transaction from concurrent writers. Is a window function the appropriate mechanism?**

A. Yes; SUM OVER commits a transaction when it finishes.

B. Yes; RANK automatically locks all conflicting stock rows.

C. No; locking and transaction control are outside the window-function domain.

D. Yes; LAG makes every update atomic.

**Correct answer:** C

**Explanation:** The limits slide explicitly separates read-only window analytics from concurrency control and ACID properties.

**Source:** AdvanceDatabases4.pdf, PDF p. 21.

**Q056. A developer claims a window function replaces the need to index a large payment table. Which response matches the lecture?**

A. The claim is incorrect: window functions do not replace indexing.

B. The claim is correct because window functions rewrite the physical heap.

C. The claim is correct whenever ORDER BY is present inside OVER.

D. The claim is correct if the window function uses SUM rather than AVG.

**Correct answer:** A

**Explanation:** The lecture says window functions are not a replacement for indexing; they compute analytic values rather than changing the storage or index structures.

**Source:** AdvanceDatabases4.pdf, PDF p. 21.

