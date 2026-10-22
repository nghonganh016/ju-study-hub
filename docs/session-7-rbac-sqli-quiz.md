# Session 7: Advanced SQL Injection & Role-Based Access Control (RBAC)

**Total:** 49 multiple-choice questions (15 original Quiz 5 questions + 34 additional questions).

**Source:** `DB7.pdf`. Page references use **PDF page numbers (1–33)**, not the smaller slide counters printed on the slides.

**Preservation:** Questions 1–15 and their A–D options are extracted from `Quiz 5_ Answers.pdf`, preserving their wording and original answer positions. The explanations and slide citations are presented for Study Hub review.

## Part A: Original Quiz 5 (unchanged)

### Q1. Which description of an RLS policy in PostgreSQL is most accurate?

A. A trigger that copies allowed rows into a separate private table
B. A rule in the app code that removes rows after the query returns
C. A filter condition the database adds to queries automatically
D. A view that each developer must call instead of the base table

**Correct answer:** C
**Explanation:** A policy acts like a silent WHERE clause that the engine adds to every query from the affected roles, so no application code has to change.
**Slide reference:** `DB7.pdf`, PDF page 23.

### Q2. Why do prepared statements stop SQL Injection?

A. The database removes all quote characters from the input
B. The query structure is fixed before the user values arrive
C. The query runs with superuser rights, so no errors can occur
D. The user input is encrypted before it is sent to the server

**Correct answer:** B
**Explanation:** The SQL template is parsed first and the query tree is locked. Values sent later are treated only as literal data, so they cannot change the logic of the query.
**Slide reference:** `DB7.pdf`, PDF page 13.

### Q3. One RLS policy on rental uses the condition staff_id = (SELECT staff_id FROM staff WHERE username = current_user). Why does this single policy show Mike only his rentals and Jon only his rentals?

A. The application adds a WHERE clause for each user before it sends the query
B. The policy is rebuilt by the DBA each time a different staff member logs in
C. current_user is read per session, so each user gets a different filter
D. Postgres makes one copy of the rental table for every member of store_clerk

**Correct answer:** C
**Explanation:** current_user returns the role of the current database session, so the same policy expression produces a different filter for each logged-in user. No application code or extra policies are needed.
**Slide reference:** `DB7.pdf`, PDF page 24.

### Q4. The DVD store website hides all SQL error messages. An attacker sends customer_id=5 AND 1=1 and then customer_id=5 AND 1=2. In this Boolean-based blind SQLi, what signal does the attacker rely on?

A. A copy of the database backup left on the server
B. Detailed SQL error messages printed on the web page
C. Differences in the page content for TRUE vs FALSE
D. The exact time the server takes to send a reply

**Correct answer:** C
**Explanation:** Boolean-based blind SQLi asks TRUE/FALSE questions and reads the answer from how the page changes (profile loads vs. profile disappears). No error messages are needed.
**Slide reference:** `DB7.pdf`, PDF page 9.

### Q5. In modern PostgreSQL (since 8.1), what is the relationship between a "user" and a "group"?

A. Groups can log in, but users can only receive privileges
B. Both are roles; a user is simply a role with LOGIN
C. Users are stored in tables; groups are stored in files
D. They are separate objects that cannot be linked together

**Correct answer:** B
**Explanation:** Users and groups were merged into one concept: ROLE. A role with LOGIN acts as a user; a role without LOGIN that other roles are members of acts as a group.
**Slide reference:** `DB7.pdf`, PDF page 17.

### Q6. Which command is equivalent to CREATE USER alice WITH PASSWORD 'x';?

A. CREATE ROLE alice WITH NOLOGIN PASSWORD 'x';
B. CREATE ROLE alice WITH LOGIN PASSWORD 'x';
C. CREATE GROUP alice WITH INHERIT PASSWORD 'x';
D. CREATE ROLE alice WITH SUPERUSER PASSWORD 'x';

**Correct answer:** B
**Explanation:** CREATE USER is the same as CREATE ROLE, except that LOGIN is added by default.
**Slide reference:** `DB7.pdf`, PDF page 17.

### Q7. RLS is enabled on rental, with a policy that applies only to store_clerk. The DBA connects as postgres (superuser) and runs SELECT COUNT(*) FROM rental;. What happens?

A. It fails, because RLS blocks every role except store_clerk
B. It counts all rows, because superusers always bypass RLS
C. It returns only the rows whose staff_id is equal to 1
D. It returns zero rows, because postgres has no matching policy

**Correct answer:** B
**Explanation:** Superusers (and roles with BYPASSRLS) always bypass row-level security, so the count includes every row. This is another reason why apps must never connect as postgres.
**Slide reference:** `DB7.pdf`, PDF page 22.

### Q8. Which statement best describes Second-Order SQL Injection?

A. The attacker uses two different users to log in at once
B. The attack is sent twice to make sure that the server accepts it
C. The payload runs at once in the first query that reads it
D. The payload is stored first and runs later in another query

**Correct answer:** D
**Explanation:** In second-order SQLi the payload is stored safely first (e.g. as a last name), then executed later when another part of the system reads it and concatenates it into a new query.
**Slide reference:** `DB7.pdf`, PDF page 11.

### Q9. What is the root cause of SQL Injection?

A. The tables do not have primary keys or indexes
B. The database engine has a bug in its own SQL parser
C. User input is mixed into SQL code as plain text
D. The server runs an outdated PostgreSQL version

**Correct answer:** C
**Explanation:** SQL Injection is an application-level flaw: raw user input is concatenated into the SQL string, so the engine cannot tell data apart from code.
**Slide reference:** `DB7.pdf`, PDF page 7.

### Q10. In which situation would an attacker choose time-based blind SQLi (for example, using pg_sleep(10)) instead of Boolean-based blind SQLi?

A. When the page looks the same for TRUE and FALSE
B. When the attacker already knows the admin password
C. When the website shows full SQL errors to visitors
D. When the database uses the Serializable isolation level

**Correct answer:** A
**Explanation:** When the page is identical for TRUE and FALSE, there is no visual clue. The attacker then uses response time as the signal: a 10-second delay means the condition was TRUE.
**Slide reference:** `DB7.pdf`, PDF page 10.

### Q11. An AI pre-processing script reads actor names from the actor table and builds an UPDATE statement with a Python f-string. Which statement is true?

A. Data from your own tables is safe because it was checked on insert
B. Only data from web forms needs parameters, not data from tables
C. f-strings are safe in Python because they escape quotes by default
D. Data from your own tables can still carry an injection payload

**Correct answer:** D
**Explanation:** Golden rule: never fully trust data, even from your own tables. A stored value can carry a payload that runs when it is concatenated into a new query (second-order SQLi). f-strings do no escaping.
**Slide reference:** `DB7.pdf`, PDF page 12.

### Q12. The store_clerk role was never granted DELETE on rental. A DBA then runs: REVOKE DELETE ON rental FROM store_clerk; What is the effect of this command?

A. It blocks DELETE even when a member gets DELETE in another way
B. It raises an error, so the rest of the script stops running
C. It has no effect, since PostgreSQL has no explicit deny rule
D. It removes the store_clerk role from all of its member users

**Correct answer:** C
**Explanation:** PostgreSQL privileges are additive; there is no "deny" entry. REVOKE only removes a privilege that was granted. If it was never granted, nothing changes, and a member could still get DELETE through a direct grant or another role.
**Slide reference:** `DB7.pdf`, PDF page 20.

### Q13. According to the Principle of Least Privilege, why is it dangerous to connect a web app or AI pipeline using the postgres account?

A. The postgres account cannot run SELECT on normal tables
B. The postgres account is not allowed to use prepared statements
C. Superuser connections are slower than normal connections
D. A single SQL injection gives the attacker full control

**Correct answer:** D
**Explanation:** If the app connects as a superuser, any SQL Injection inherits superuser power: the attacker can drop databases, read local files or even run OS commands.
**Slide reference:** `DB7.pdf`, PDF page 16.

### Q14. Which limitation of traditional RBAC does Row-Level Security solve?

A. RBAC cannot control INSERT, only SELECT and DELETE commands
B. RBAC only works when the app uses an ORM such as SQLAlchemy
C. RBAC cannot give the same privilege to more than one user at once
D. RBAC controls table access, not which rows a user can see

**Correct answer:** D
**Explanation:** RBAC works at the table level (can this user access the table?). RLS answers a finer question: which specific rows can this user access?
**Slide reference:** `DB7.pdf`, PDF page 21.

### Q15. A DBA runs ALTER TABLE rental ENABLE ROW LEVEL SECURITY; but forgets to create any policy. store_clerk still has SELECT on rental. What does a normal (non-owner) member of store_clerk get from SELECT * FROM rental;?

A. Only rows where staff_id is NULL, as a safe default value
B. All rows, because RLS only starts working once a policy exists
C. No rows, because RLS denies access when no policy matches
D. An error, because a table with RLS must have a policy first

**Correct answer:** C
**Explanation:** When RLS is enabled and no policy applies, PostgreSQL uses a default-deny rule: no rows are visible, and no error is raised.
**Slide reference:** `DB7.pdf`, PDF page 23.

## Part B: Additional questions based on DB7.pdf

### Q16. Under PostgreSQL's default isolation level, which anomaly may still occur between two reads in the same transaction?

A. Dirty reads of uncommitted updates
B. Non-repeatable reads after another transaction commits
C. Uncommitted data becoming durable
D. All transactions appearing serial

**Correct answer:** B
**Explanation:** Read Committed prevents dirty reads but permits non-repeatable reads, as the recap states.
**Slide reference:** `DB7.pdf`, PDF page 4.

### Q17. An attacker changes labels in an AI training table before a model is retrained. Which risk is illustrated?

A. Index fragmentation
B. Transaction deadlock
C. Data poisoning
D. Query-plan instability

**Correct answer:** C
**Explanation:** Manipulated training labels can contaminate the data used to train the model.
**Slide reference:** `DB7.pdf`, PDF page 5.

### Q18. In the slide's vulnerable staff-login example, what is the combined purpose of OR 1=1 and the SQL comment marker?

A. Force the predicate true and comment out the password condition
B. Encrypt the username and escape the password
C. Create a new staff role and revoke its password
D. Delay execution and trigger an error message

**Correct answer:** A
**Explanation:** The tautology makes the condition true, and the comment suppresses the remaining password predicate.
**Slide reference:** `DB7.pdf`, PDF page 8.

### Q19. What role does the single quote in an injected username play in the vulnerable login query?

A. It grants SELECT on staff
B. It requests an implicit transaction
C. It invokes a PostgreSQL function
D. It closes the surrounding SQL string literal

**Correct answer:** D
**Explanation:** The quote escapes the intended data string, allowing subsequent input to be interpreted as SQL syntax.
**Slide reference:** `DB7.pdf`, PDF page 8.

### Q20. A page loads when an injected condition is TRUE and disappears when FALSE. What could an attacker infer by repeatedly changing a substring test?

A. The database engine's physical index layout
B. Secret text one character at a time
C. The duration of database checkpoints
D. The number of open transactions

**Correct answer:** B
**Explanation:** The slide shows substring(version(),1,1) as an example of character-by-character inference.
**Slide reference:** `DB7.pdf`, PDF page 9.

### Q21. A site returns identical page content for TRUE and FALSE. Which observation can still carry information about an injected condition?

A. Whether an index is visible in pgAdmin
B. Whether a trigger definition was updated
C. A reproducible response-time delay
D. A change to the application's CSS

**Correct answer:** C
**Explanation:** Time-based blind SQLi uses conditional delay as a side channel when content gives no clue.
**Slide reference:** `DB7.pdf`, PDF page 10.

### Q22. In the lecture example, what is the purpose of testing current_user in a conditional delay?

A. To discover the database role used by the connection
B. To change the active user's password
C. To grant access to the payment table
D. To list every role in the cluster

**Correct answer:** A
**Explanation:** The example conditions the delay on whether current_user is postgres, revealing the connection role through timing.
**Slide reference:** `DB7.pdf`, PDF page 10.

### Q23. A malicious surname is stored safely but later appended to a reporting query. At which stage does the SQL Injection vulnerability become exploitable?

A. When an index is created for surname
B. When the string is inserted using safe parameters
C. When the database takes a backup
D. When the reporting query mixes the stored value into SQL text

**Correct answer:** D
**Explanation:** Second-order SQLi arises when previously stored content is later treated as executable SQL.
**Slide reference:** `DB7.pdf`, PDF page 11.

### Q24. An AI pipeline reads actor names from a trusted-looking database table. Which coding change best addresses the lecture's second-order SQLi risk?

A. Use a larger VARCHAR field
B. Build an UPDATE with f-string formatting
C. Bind actor names as query parameters when issuing UPDATE
D. Disable all indexes on the actor table

**Correct answer:** C
**Explanation:** Stored strings are not inherently safe; parameter binding prevents actor names from modifying the UPDATE statement structure.
**Slide reference:** `DB7.pdf`, PDF page 12.

### Q25. In PREPARE staff_login(text, text), what do $1 and $2 represent?

A. Column positions in the staff table
B. Parameter placeholders populated at execution time
C. The first two rows returned by the query
D. Two role identifiers granted LOGIN

**Correct answer:** B
**Explanation:** The prepared query uses placeholders for username and password, with values bound later at EXECUTE.
**Slide reference:** `DB7.pdf`, PDF page 13.

### Q26. A malicious username contains quote characters and OR 1=1, but is sent as a bound parameter. What happens to the query's intended predicate?

A. It is replaced with an always-true expression
B. It becomes a new SQL comment
C. It is executed as an independent statement
D. It remains unchanged because the payload is treated as data

**Correct answer:** D
**Explanation:** The prepared statement's SQL structure is fixed; the payload is treated as a literal username value.
**Slide reference:** `DB7.pdf`, PDF page 13.

### Q27. A search endpoint expects customer_id to be an integer. Which additional application-layer control matches the slide's guidance?

A. Validate that customer_id has an integer type before querying
B. Grant the application SUPERUSER temporarily
C. Use string concatenation only for numeric inputs
D. Allow all customer_id values and rely on hidden errors

**Correct answer:** A
**Explanation:** Input validation should enforce integer types for customer_id in addition to parameterized queries.
**Slide reference:** `DB7.pdf`, PDF page 14.

### Q28. Which combination most closely reflects the defense-in-depth approach in the lecture?

A. Only remove database error messages
B. Only assign a password to the postgres role
C. Use parameterized queries, input validation, and least-privilege connections
D. Make all tables read-only for the database owner

**Correct answer:** C
**Explanation:** The slide combines ORM/prepared statement use, validation, and least privilege rather than relying on a single layer.
**Slide reference:** `DB7.pdf`, PDF page 14.

### Q29. An inference service only reads feature records. Under PoLP, which account configuration is most appropriate?

A. A superuser account so queries never fail
B. A restricted role with only the required read privileges
C. A role with CREATE ROLE and DROP permissions
D. A table owner account with unrestricted write access

**Correct answer:** B
**Explanation:** The Principle of Least Privilege requires only the minimum access needed for the service to function.
**Slide reference:** `DB7.pdf`, PDF page 16.

### Q30. What is the immediate effect of CREATE ROLE data_analyst; as written in the lecture?

A. It creates a role without LOGIN by default
B. It creates a role that can log in automatically
C. It creates a database named data_analyst
D. It grants SELECT on all public tables

**Correct answer:** A
**Explanation:** CREATE ROLE defaults to NOLOGIN, so the example acts as a group-style role.
**Slide reference:** `DB7.pdf`, PDF page 17.

### Q31. Why does RBAC usually assign privileges to group roles before users?

A. It automatically turns RLS off
B. It replaces the need for table grants
C. It forces all users to share one password
D. It centralizes permission management for multiple users

**Correct answer:** D
**Explanation:** Permissions can be granted once to the role and reused via membership by Mike, Jon, and others.
**Slide reference:** `DB7.pdf`, PDF page 18.

### Q32. Which command adds jon to the existing store_clerk role?

A. GRANT jon TO store_clerk;
B. GRANT store_clerk TO jon;
C. ALTER ROLE store_clerk OWNER TO jon;
D. CREATE USER store_clerk FOR jon;

**Correct answer:** B
**Explanation:** GRANT store_clerk TO jon assigns membership in the group role to Jon.
**Slide reference:** `DB7.pdf`, PDF page 19.

### Q33. A DBA wants to remove Jon's membership in store_clerk without deleting either role. Which command matches the lecture?

A. DROP ROLE jon;
B. REVOKE jon FROM store_clerk;
C. REVOKE store_clerk FROM jon;
D. DROP OWNED BY store_clerk;

**Correct answer:** C
**Explanation:** Role membership is removed by revoking the granted group role from the member.
**Slide reference:** `DB7.pdf`, PDF page 19.

### Q34. Which SQL command grants clerks permission to read film records without allowing film changes?

A. GRANT SELECT ON film TO store_clerk;
B. GRANT INSERT ON film TO store_clerk;
C. GRANT UPDATE ON film TO store_clerk;
D. GRANT ALL ON film TO store_clerk;

**Correct answer:** A
**Explanation:** SELECT permits reading; INSERT and UPDATE change data, while ALL grants broader permissions.
**Slide reference:** `DB7.pdf`, PDF page 20.

### Q35. According to the lecture's RBAC setup, which privilege set is granted on rental to store_clerk?

A. SELECT and DELETE
B. INSERT and DELETE
C. UPDATE and DELETE
D. SELECT, INSERT, and UPDATE

**Correct answer:** D
**Explanation:** The rental grant includes SELECT, INSERT, UPDATE, while DELETE is not granted.
**Slide reference:** `DB7.pdf`, PDF page 20.

### Q36. Mike and Jon both inherit SELECT ON rental from store_clerk. Without RLS, what is the relevant privacy problem?

A. Only the role creator can query rental
B. Each clerk can read rentals belonging to the other clerk
C. Membership revokes SELECT from both users
D. The database copies rental into separate tables

**Correct answer:** B
**Explanation:** Table-level RBAC permits access to the table, not different subsets of its rows.
**Slide reference:** `DB7.pdf`, PDF page 21.

### Q37. Why is RLS especially useful for a multi-tenant application sharing one table?

A. It eliminates every need for application authentication
B. It guarantees queries use index scans
C. It restricts which rows each tenant's role can access
D. It encrypts every row with a different key

**Correct answer:** C
**Explanation:** RLS applies database-enforced row filters so tenants can share tables while maintaining data isolation.
**Slide reference:** `DB7.pdf`, PDF page 22.

### Q38. Which sequence correctly implements the basic two-step RLS approach?

A. Enable RLS on a table, then create a policy for permitted rows
B. Create an index, then update the table's owner
C. Create separate tables per user, then hide the originals
D. Revoke LOGIN from every user, then enable autocommit

**Correct answer:** A
**Explanation:** The lecture first enables row-level security and then defines a policy that controls visibility.
**Slide reference:** `DB7.pdf`, PDF page 23.

### Q39. In CREATE POLICY ... FOR ALL TO store_clerk USING (...), which clause identifies the roles covered by the policy?

A. USING
B. FOR ALL
C. ON rental
D. TO store_clerk

**Correct answer:** D
**Explanation:** TO selects the role or roles to which the policy applies; USING provides the row filter.
**Slide reference:** `DB7.pdf`, PDF page 24.

### Q40. What does FOR ALL signify in the slide's rental policy definition?

A. The policy ignores row filters
B. The policy targets all four command categories named in the slide
C. The policy grants ALL table privileges
D. The policy applies to every database in the cluster

**Correct answer:** B
**Explanation:** The slide explicitly explains FOR ALL as applying to SELECT, INSERT, UPDATE, and DELETE policy behavior.
**Slide reference:** `DB7.pdf`, PDF page 24.

### Q41. Which condition is used in the rental policy to match a row to the currently active staff role?

A. rental_id = current_user
B. customer_id = current_user
C. staff_id = (SELECT staff_id FROM staff WHERE username = current_user)
D. staff_id IS NOT NULL

**Correct answer:** C
**Explanation:** The policy looks up the staff_id for the current database role and compares it with each rental row's staff_id.
**Slide reference:** `DB7.pdf`, PDF page 24.

### Q42. After SET ROLE mike, why can SELECT * FROM rental return Mike's records without a manual WHERE clause?

A. The database applies the matching RLS policy automatically
B. SET ROLE physically deletes Jon's rows
C. PostgreSQL creates a materialized view for Mike
D. The application adds a special staff filter

**Correct answer:** A
**Explanation:** PostgreSQL automatically enforces the policy condition when the query runs in Mike's role context.
**Slide reference:** `DB7.pdf`, PDF page 25.

### Q43. In Lab 1, which table permissions should cashier_role have on payment?

A. SELECT only
B. INSERT and UPDATE only
C. SELECT, UPDATE, and DELETE
D. SELECT and INSERT

**Correct answer:** D
**Explanation:** Lab 1 requires SELECT and INSERT on payment; UPDATE and DELETE are not part of this grant.
**Slide reference:** `DB7.pdf`, PDF page 28.

### Q44. Which statement grants cashier_role read access to both film and staff in the lecture's solution?

A. GRANT SELECT ON payment TO cashier_role;
B. GRANT SELECT ON film, staff TO cashier_role;
C. GRANT SELECT ON DATABASE dvdrental TO cashier_role;
D. GRANT ALL ON film, staff TO cashier_role;

**Correct answer:** B
**Explanation:** The lab's solution grants SELECT on both named tables in one command.
**Slide reference:** `DB7.pdf`, PDF page 29.

### Q45. In the payment isolation lab, which table is the target of ENABLE ROW LEVEL SECURITY?

A. staff
B. rental
C. payment
D. film

**Correct answer:** C
**Explanation:** Lab 2 enables RLS on the payment table to restrict each cashier's payment visibility.
**Slide reference:** `DB7.pdf`, PDF page 30.

### Q46. Which RLS command scope is used for isolate_cashier_payments in the solution?

A. FOR SELECT TO cashier_role
B. FOR ALL TO PUBLIC
C. FOR UPDATE TO store_manager
D. FOR INSERT TO postgres

**Correct answer:** A
**Explanation:** The solution creates a SELECT policy that applies to cashier_role specifically.
**Slide reference:** `DB7.pdf`, PDF page 31.

### Q47. According to the Lab 2 solution, which output pair corresponds to SELECT COUNT(*) FROM payment under SET ROLE mike and SET ROLE jon?

A. Mike: 7304; Jon: 7292
B. Mike: 8000; Jon: 8000
C. Mike: 0; Jon: 0
D. Mike: 7292; Jon: 7304

**Correct answer:** D
**Explanation:** The slide reports 7292 visible payments for Mike and 7304 for Jon after switching roles.
**Slide reference:** `DB7.pdf`, PDF page 31.

### Q48. Which set best represents the three database-security pillars emphasized at the end of Session 7?

A. Indexing, sharding, and replication
B. Prevent SQLi, enforce least privilege, and isolate rows with RLS
C. Autocommit, write-ahead logging, and vacuum
D. Partitioning, hashing, and sorting

**Correct answer:** B
**Explanation:** The final takeaways bring together SQLi prevention, RBAC/least privilege, and RLS.
**Slide reference:** `DB7.pdf`, PDF page 32.

### Q49. A student deploys an AI model backed by PostgreSQL. Which implementation choice best applies the session's project guidance?

A. Connect with postgres to simplify administration
B. Keep all features in a publicly writable table
C. Use a restricted application role and parameterized database access
D. Disable all user roles and manage security in CSS

**Correct answer:** C
**Explanation:** The project integration slide promotes applying database security practices in a real AI application rather than relying on a superuser connection.
**Slide reference:** `DB7.pdf`, PDF page 33.
