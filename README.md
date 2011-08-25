<h1>template</h1>

<p>A user interface development framework</p>

<blockquote>It is super brilliant! It is really simple to work with your framework. I am really your fan ;) – Dmitri Dudin</blockquote>

<h2>Popdowns, dropdowns, tabs and slides</h2>

<p>Popdowns, dropdowns, tabs and slides are class-based ui elements with two states. When they are visible, they have the class <code>active</code>. When they are not, they don't.</p>

<p>They share a common API for triggering active state. Firstly, they are activated when the user clicks on a link that refers to them by id:</p>

<pre class="html">&lt;a href=&quot;#id_of_dropdown&quot;&gt;Open dropdown&lt;/a&gt;</pre>

<p>Secondly, they can also be activated and deactivated programmatically:</p>

<pre class="js">jQuery('.dropdown').eq(2).trigger('activate');</pre>
<pre class="js">jQuery('.dropdown').eq(2).trigger('deactivate');</pre>

<p>Links that refer to popdowns, dropdowns, tabs and slides are also given the class <code>active</code>, making it easy to create stateful buttons. Transitions to and from active state are defined using CSS transitions.</p>

<p>Creating a popdown, dropdown, set of tabs or a slide is as easy as adding a class to a node. Here we add the class <code>popdown</code> to a div:</p>

<pre class="html">&lt;a href=&quot;#arthur&quot;&gt;Open dropdown&lt;/a&gt;
&lt;div class=&quot;popdown&quot; id=&quot;arthur&quot;&gt;
	&lt;p&gt;Ford, there is an infinite number of monkeys outside, who want to
	talk to us about this script for Hamlet they have worked out.&lt;/p&gt;
&lt;/div&gt;</pre>

<p>In addition to the common functionality, each of these ui classes has some specific behaviour.</p>

<h3>.dropdown</h3>
 
<p>Dropdowns are used to make menus and navigation. Once active, they deactivate when the user touches or mousedowns outside them, or when the user clicks on or inside them.</p>

<h3>.popdown</h3>

<p>Popdowns are used to make menus, drawers, and elements that require explicit deactivation. Once active, they deactivate when the user touches or mousedowns outside them, or when a <code>#close</code> link is clicked inside them:</p>

<pre class="html">&lt;a href=&quot;#close&quot;&gt;Close&lt;/a&gt;</pre>

<h3>.tab, .slide</h3>

<p>Tabs and slides are functionally identical. Two classes are provided for convenience, as tabs and slides tend to be styled very differently. Where we refer to 'tabs' below, assume that we also mean slides.</p>

<p>In any group of tabs, only one can be active at any one time. Normally, all <code>.tab</code> siblings of the tab currently being activated automatically become a group.</p>

<p>To be more explicit, the grouping can be overridden with a <code>data-selector</code> attribute containing a selector for all other tabs in the group. The selector can be any that jQuery understands. Here are two tabs grouped using a <code>data-selector</code> attribute:</p>

<pre class="html" title="You may be wondering about that odd div closing tag. That's a technique for creating spaceless html. See the section on html style.">&lt;div class=&quot;quote_tab tab&quot; id=&quot;ford&quot; data-selector=&quot;.quote_tab&quot;&gt;
	&lt;p&gt;Time is an illusion. Lunchtime, doubly so.&lt;/p&gt;
&lt;/div

&gt;&lt;div class=&quot;quote_tab tab&quot; id=&quot;zaphod&quot; data-selector=&quot;.quote_tab&quot;&gt;
	&lt;p&gt;I'm a great and amazing guy, didn't I tell you baby?&lt;/p&gt;
&lt;/div&gt;</pre>

<p>Of course, this means you can create tab groups from non-sibling elements. A little care must be taken, however; all tabs in a group must share the same <code>data-selector</code>: a tab can only belong to one group, and if it is inadvertently selected by another group it will cause some odd behaviour.</p>

<p>Inside tabs and slides, a couple of special links can be used for navigation:</p>

<pre>&lt;a href=&quot;#prev&quot;&gt;Previous slide&lt;/a&gt;
&lt;a href=&quot;#next&quot;&gt;Next slide&lt;/a&gt;</pre>

<p>&#8230;navigating backwards and forwards through the group respectively.</p>

<h3>Under the hood: the <code>activate</code> event</h3>

<p>Popdowns, dropdowns, tabs and slides are all activated by triggering the jQuery special event <code>activate</code>. The definition of this event can be found in js/jquery.event.activate.js. By default, the <code>activate</code> event adds the class <code>active</code> to the element it is triggered on, plus any links that reference that element's id via their <code>href</code> attribute.</p>

<p>The <code>activate</code> event greatly simplifies the code needed to make dropdowns and tabs respond both to user actions and programmatically. Using the <code>activate</code> event as an abstraction, the code that makes dropdowns, popdowns, tabs and slides respond to user events can be found in js/template.ui.js.</p>

<h2>master branch</h2>

<p>A base template as used for webdoc.</p>

<h2>app branch</h2>

<p>Template for creating app iframes.</p>

<h2>inspector branch</h2>

<p>Template for creating inspector iframes.</p>