Simple sample size/budget calculator based on base conversion rate and CPM based on the calculations from: 
https://www.evanmiller.org/ab-testing/sample-size.html



```
def calc_sample_size(alpha, power, p, pct_mde):
    """ 
    Args:
        alpha (float): How often are you willing to accept a Type I error (false positive)?
        power (float): How often do you want to correctly detect a true positive (1-beta)?
        p (float): Base conversion rate
        pct_mde (float): Minimum detectable effect, relative to base conversion rate.

    """
    delta = p*pct_mde
    t_alpha2 = norm.ppf(1.0-alpha/2)
    t_beta = norm.ppf(power)

    sd1 = np.sqrt(2 * p * (1.0 - p))
    sd2 = np.sqrt(p * (1.0 - p) + (p + delta) * (1.0 - p - delta))

    return (t_alpha2 * sd1 + t_beta * sd2) * (t_alpha2 * sd1 + t_beta * sd2) / (delta * delta)

Confidence level is fixed to be 95%
Statistical Power is fixed to be 80%
```
