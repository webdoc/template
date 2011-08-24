<h1>template</h1>


<h2>Popdowns, dropdowns, tabs and slides</h2>

<p>Popdowns, dropdowns, tabs and slides are class-based animated elements. When they are visible, they have the class <code>active</code>.</p>

<h3>.popdown and .dropdown</h3>

<p>Popdowns and dropdowns are used to make menus, dropdown navigation, and drawers that slide out from underneath other elements. You can activate them by id via a link:</p>
<pre>&lt;a href=&quot;#id_of_dropdown&quot;&gt;Open dropdown&lt;/a&gt;</pre>

<p>Or you can activate them programmatically using an <code>activate</code> event:</p>
<pre>jQuery('.dropdown').eq(2).trigger('activate');</pre>

<p>Popdowns and dropdowns deactivate as soon as the user mousedowns or touchstarts outside of them, but there is a subtle difference between how they react to user events inside of them: A dropdown deactivates as soon as you click on it, making it ideal for the creation of temporary menus; a popdown deactivates only when the user clicks on a close link inside of it:</p>
<pre>&lt;a href=&quot;#close&quot;&gt;Close dropdown&lt;/a&gt;</pre>

<p>Popdowns and dropdowns can also be deactivated programmatically, by triggering a <code>deactivate</code> event:</p>
<pre>jQuery('.dropdown').eq(2).trigger('deactivate');</pre>

<h3>.tab and .slide</h3>

<p>As with dropdowns and popdowns, a tab or slide can be referenced with a link:</p>
<pre>&lt;a href=&quot;#id_of_slide&quot;&gt;Go to slide&lt;/a&gt;</pre>

<p>Or you can activate them programmatically using an <code>activate</code> event:</p>
<pre>jQuery('.slide').eq(2).trigger('activate');</pre>

<p>Also, inside slides and tabs, the special links:</p>
<pre>&lt;a href=&quot;#prev&quot;&gt;Previous slide&lt;/a&gt;
&lt;a href=&quot;#next&quot;&gt;Next slide&lt;/a&gt;</pre>
<p>&ellips;navigate backwards and forwards respectively.</p>

<h3>Under the hood: the <code>activate</code> event</h3>

<p>Popdowns, dropdowns, tabs and slides are all activated by triggering the jQuery special event <code>activate</code>. The definition of this event can be found in js/jquery.event.activate.js. By default, the <code>activate</code> event adds the class <code>active</code> to the element it is triggered on, plus any links that reference that element's id via their <code>href</code> attribute.</p>

<p>The <code>activate</code> event greatly simplifies the code needed to make dropdowns and tabs respond both to user actions and programmatically. Using the <code>activate</code> event as an abstraction, the code that makes dropdowns, popdowns, tabs and slides respond to user events can be found in js/template.ui.js.</p>

<h2>master branch</h2>

<p>A base template as used for webdoc.</p>

<h2>app branch</h2>

<p>Template for creating app iframes.</p>

<h3>Todo notes</h3>

<ul>
  <li>Something wrong with making a default tab open, and giving it and its tab_button class .active.</li>
  <li>.transition class is not being removed from tabs.</li>
  <li>.class active for filters - this should be automatic, based on their associated inputs... there's a script for that somewhere, I'm surprised it's not in the template project, but it's time to find it...</li>
</ul>

<h2>inspector branch</h2>

<p>Template for creating inspector iframes.</p>