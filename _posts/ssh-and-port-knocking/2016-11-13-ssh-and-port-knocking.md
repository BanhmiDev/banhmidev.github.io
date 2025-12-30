---
layout: single
title:  "SSH and Port Knocking"
date:   2016-11-13 09:29:20 +0300
categories: blog
tags: ssh server
usemathjax: true
---

It turns out that SSH brute-force attacks, dictionary attacks or combinations of those are daily routines nowadays. Server logs are quickly filled with login attempts, in the hopes that one of them is right. The best prevention against these kind of attacks is to - obviously - have a secure password, or even better to force key-based authentication.

However, this won't stop automated attacks from trying out dozens of usernames and passwords anyway, which is generally annoying. Thus, the approach to hide the SSH port, which by default is 22. One solution some people do is moving SSH to a non-standard port. Basically, some random number that won’t conflict with anything else.

Another interesting trick is to not immediately expose the SSH port, but only when a client is saying “Open Sesame”. Jokes aside, that’s roughly what port knocking allows us to do. There are many variants on port knocking and many programs that implement it. The following tutorial will use knockd as port-knocking server.

## Install Prerequisites
Download and install the knock-server rpm package:

{% highlight bash %}
$ wget http://li.nux.ro/download/nux/misc/el6/i386/knock-server-0.5-7.el6.nux.i686.rpm
$ rpm -ivh knock-server-0.5-7.el6.nux.i686.rpm
{% endhighlight %}

## Configuration

The configuration file can be found under {% highlight bash %}/etc/knockd.conf{% endhighlight %}

{% highlight bash %}
[options]
        logfile = /var/log/knockd.log
 
[openSSH]
        sequence    = 6000,7000,8000
        seq_timeout = 15
        command     = /sbin/iptables -I INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
        tcpflags    = syn
 
[closeSSH]
        sequence    = 8000,7000,6000
        seq_timeout = 15
        command     = /sbin/iptables -D INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
        tcpflags    = syn
{% endhighlight %}

In the above configuration, we’ve stated that any host that sends a TCP SYN message to port 6000, then 7000 and finally to 8000, within 15 seconds, will cause the iptables command to be run. As you can see, the use of iptables is not hard-coded to knockd at all, meaning that any command can be run when the port sequence is triggered, allowing us to do all sorts of fancy stuff. To close it up, we do the same sequence in reverse order (that’s because we have configured it to do so).

## Final Steps and Usage

Once everything is installed and configured, start it up and begin testing. Leave a separate SSH connection open to the server while you are testing!

{% highlight bash %}
$ systemctl enable knockd
$ systemctl start knockd
{% endhighlight %}

On the client, try out knocking with telnet:

{% highlight bash %}
$ telnet example.com 6000
$ telnet example.com 7000
$ telnet example.com 8000
{% endhighlight %}

The knockd log file, located under {% highlight bash %}/var/log/knockd.log{% endhighlight %} and should print out something like this:

{% highlight bash %}
[2016-11-12 16:11] <CLIENT_IP>: openSSH: Stage 1
[2016-11-12 16:12] <CLIENT_IP>: openSSH: Stage 2
[2016-11-12 16:12] <CLIENT_IP>: openSSH: Stage 3
[2016-11-12 16:12] <CLIENT_IP>: openSSH: OPEN SESAME
[2016-11-12 16:12] openSSH: running command: /sbin/iptables -I INPUT -s <CLIENT_IP> -p tcp --dport 22 -j ACCEPT
{% endhighlight %}

Your iptables configuration should now contain a new line, which accepts the client’s IP on port 22. Closing the connection can also be done as seen above, of course with the respective sequence of ports (8000, 7000, 6000 in this case).

The next step is to lock everyone else out from the SSH port. Add a new rule to the firewall, but make sure it goes to the bottom:

{% highlight bash %}
$ iptables -A INPUT -p tcp --dport ssh -j DROP
{% endhighlight %}

Finally restart iptables (<strong>ATTENTION</strong>: this will drop your current SSH connection, make sure that everything above is working!):

{% highlight bash %}
$ systemctl restart iptables
{% endhighlight %}

## Conclusion

It certainly doesn’t prevent a targeted attack, but it might prevent most automated attacks. You are also not bound to the iptables command, meaning that you can do all sorts of fancy stuff with port knocking.

