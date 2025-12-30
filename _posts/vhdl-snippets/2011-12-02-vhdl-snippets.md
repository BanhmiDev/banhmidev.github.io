---
layout: single
title:  "VHDL Snippets"
date:   2011-12-02 09:29:20 +0300
categories: blog
tags: vhdl code
usemathjax: true
---

A quick cheat sheet of VHDL code snippets for common tasks and beginners.

### Entity

{% highlight vhdl %}
entity ENTITY_NAME is
port(
    i_a : in std_logic;
    i_b : in std_logic;
    i_c : in std_logic;
    o_c : out std_logic
);
end entity;
{% endhighlight %}

### Architecture
Processes run concurrent to each other.

{% highlight vhdl %}
architecture ARCHITECTURE_NAME of ENTITY_NAME is
type states is (q0, q1, q2, q3);
signal state : states; -- end internal signals

begin
-- concurrent code
PROCESS_NAME : process(i_c) -- sensitivity list
begin
    if rising_edge(i_c) then
        -- sequential code
    elsif falling_edge(i_c) then
        -- sequential code
    end if;
end process;
-- concurrent code
end architecture;
{% endhighlight %}

### Process

{% highlight vhdl %}
process(c_in) is
begin
    if (c_in='1') then
        -- do something
    end if;
end process;
{% endhighlight %}

### Process (rising edge)

{% highlight vhdl %}
process(c_in) is
begin
    if (c_in'event and c_in='1') then
        -- do something
    end if;
end process;
{% endhighlight %}

{% highlight vhdl %}
process(c_in) is
begin
    if (rising_edge(c_in)) then
        -- do something
    end if;
end process;
{% endhighlight %}

### Component
{% highlight vhdl %}
architecture ARCHITECTURE_NAME of ENTITY_NAME is
component HALF_ADDER
    port (i_x, i_y, i_enable : in std_logic;
    o_result, o_carry : out std_logic );
end component;

begin
HA1 : half_adder port map (i_x => a, i_y => b, i_enable => i_enable, o_result => s1, o_carry => c1);
HA2 : half_adder port map (s1, cin, i_enable, sum, c2); -- defining through order of ports
end architecture;
{% endhighlight %}

### Variables
Sequential, repeated assignments allowed (e.g. in loops).

{% highlight vhdl %}
variable test : std_logic;
variable := '1';
{% endhighlight %}

### Signals
Concurrent, no repeated assignments allowed within a segment.

{% highlight vhdl %}
signal test : std_logic;
signal <= '1';
{% endhighlight %}

### Bit Vector
{% highlight vhdl %}
bit_vector : std_logic_vector(1 downto 0);
bit_vector <= "00";
bit_vector'range -- to get the length
{% endhighlight %}

### Enumeration
{% highlight vhdl %}
type state_type is (state1, state2, state3);
signal state : state_type;
{% endhighlight %}

### Initial Values
{% highlight vhdl %}
constant value_one : std_logic_vector(5 downto 0) := “100000”; -- not ignored in actual hardware
signal value_two : std_logic_vector(5 downto 0) := “100000”; -- will be ignored outside simulations
{% endhighlight %}

Solution: initialize values in reset segment!

{% highlight vhdl %}
if reset = '1' then
    value_one <= "1000000";
end if;
{% endhighlight %}

### Case
{% highlight vhdl %}
case expression is
    when choice =>
        -- sequence of statements
    when choice2 =>
        -- sequence of statements
    when others =>
        -- optional default case
end case;
{% endhighlight %}

### Functions
{% highlight vhdl %}
function FUNCTION_NAME (parameter : parameter_type) return type is
    -- declarations
begin
    -- sequential code
end function;
{% endhighlight %}