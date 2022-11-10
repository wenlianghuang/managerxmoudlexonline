import subprocess

if __name__ == "__main__":
    args = [
        'git',
        'add',
        '.'
    ]
    subprocess.run(args,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    args = [ 
        'git',
        'commit',
        '-m',
        'Test'
    ]
    
    subprocess.run(args,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    
    args = [ 
        'git',
        'push',
        '-u',
        'origin',
        'main',
    ]
    
    subprocess.run(args,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)